#!/usr/bin/env node
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "./lib/args.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = parseArgs(process.argv.slice(2));
const out = resolve(root, args.out || "dist");
if (out === root) throw new Error("Build output cannot be the repository root.");
rmSync(out, { recursive: true, force: true });
const pkg = readJson("package.json");
const tokens = readJson("src/tokens.json");
const policies = readJson("src/policies.json");
const logoAssets = readJson("src/logo-assets.json");

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function readJson(path) {
  return JSON.parse(read(path));
}

function write(path, content) {
  const destination = join(out, path);
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, content);
}

function copy(source, destination) {
  const from = join(root, source);
  if (!existsSync(from)) return;
  const to = join(out, destination);
  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to, { recursive: true });
}

function cssName(group, name) {
  return `--maslow-${group}-${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;
}

function cssOutput() {
  const lines = ["/* Generated from src/tokens.json. Do not edit. */", ":root {"];
  for (const [group, values] of Object.entries(tokens)) {
    if (typeof values !== "object") continue;
    for (const [name, value] of Object.entries(values)) lines.push(`  ${cssName(group, name)}: ${value};`);
  }
  lines.push("}", "");
  return lines.join("\n");
}

function allFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? allFiles(path) : [path];
  });
}

function sha(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function assetHashes() {
  return Object.fromEntries(allFiles(join(root, "assets")).sort().map((path) => [relative(join(root, "assets"), path), sha(path)]));
}

function sourceHashes() {
  return Object.fromEntries([
    "src/tokens.json",
    "src/policies.json",
    "src/logo-assets.json",
    "src/brand-contract.md",
  ].map((path) => [path, sha(join(root, path))]));
}

function pluginManifest(adapter) {
  return JSON.stringify({
    name: "maslow-brand-os",
    version: pkg.version,
    description: "Maslow AI brand contract, artifact skills, templates, and release validation.",
    author: { name: "Maslow AI" },
    skills: "./skills/",
    interface: {
      displayName: "Maslow Brand OS",
      shortDescription: "Create and validate Maslow-branded work",
      developerName: "Maslow AI",
      category: "Productivity",
      capabilities: ["Interactive", "Read", "Write"],
      brandColor: tokens.color.navy,
    },
    adapter,
  }, null, 2) + "\n";
}

function copyShared(destination, { portableRoot = false } = {}) {
  if (portableRoot) {
    ["plugin.json", "SKILL.md", "INSTALL.md"].forEach((path) => copy(path, `${destination}/${path}`));
  }
  ["skills", "src", "assets", "scripts", "templates", "components"].forEach((path) => copy(path, `${destination}/${path}`));
  copyArtifactStarters(destination);
}

function copyArtifactStarters(destination) {
  ["pptx", "docx", "pdf", "social"].forEach((format) => copy(`artifacts/${format}`, `${destination}/artifacts/${format}`));
}

function stripFrontmatter(source) {
  return source.replace(/^---\n[\s\S]*?\n---\n/, "").trim();
}

function chatGptSkill() {
  const taskSkills = [
    "maslow-messaging-campaigns",
    "maslow-web-interface",
    "maslow-presentations",
    "maslow-documents-pdf",
    "maslow-social-imagery",
    "maslow-brand-review",
  ].map((name) => stripFrontmatter(read(`skills/${name}/SKILL.md`))).join("\n\n");
  return `---
name: maslow-brand-os
description: Use when creating or reviewing any Maslow AI branded website, presentation, document, PDF, campaign, social asset, image, or interface.
---

# Maslow Brand OS ${pkg.version}

Apply this compact contract before every task. Do not search for a different brand authority.

## Exact action and shape rules

- Primary action: ${tokens.action.primary} with ${tokens.action.primaryInk} text.
- Inverse action: ${tokens.action.inverse} with ${tokens.action.inverseInk} text on dark surfaces.
- Link: ${tokens.action.link}; hover: ${tokens.action.linkHover}; focus: ${tokens.action.focus}.
- Pink ${tokens.action.signal} is a small signal only, never a default element fill or readable text.
- Structural radius: ${tokens.radius.structural}. Non-interactive taxonomy labels use ${tokens.radius.capsule}. Circles are limited to avatars, status dots, step markers, and meaningful small signals.

${read("src/brand-contract.md")}

## Task instructions

${taskSkills}

## Included resources

Use \`src/tokens.json\`, \`src/policies.json\`, \`src/schemas/\`, \`templates/\`, \`assets/\`, and \`scripts/validate.mjs\`. Run release validation before delivery.
`;
}

const manifest = {
  packageName: pkg.name,
  version: pkg.version,
  contractVersion: tokens.version,
  logoPolicy: logoAssets.policy,
  logoAssets: logoAssets.variants,
  sourceHashes: sourceHashes(),
  assetHashes: assetHashes(),
};

write("npm/tokens.css", cssOutput());
write("npm/tokens.js", `export const brandVersion = ${JSON.stringify(pkg.version)};\nexport const evidenceStatuses = ${JSON.stringify(policies.evidence.statuses)};\nexport const tokens = ${JSON.stringify(tokens, null, 2)};\nexport const actionTheme = tokens.action;\n`);
write("npm/tokens.d.ts", `export type EvidenceStatus = "production" | "modeled" | "illustrative" | "in_preparation";
export interface ArtifactClaim { text: string; evidenceStatus: EvidenceStatus; source?: string; }
export interface ArtifactBrief { format: "web" | "pptx" | "docx" | "pdf" | "social"; audience: string; objective: string; cta: string; claims: ArtifactClaim[]; provenance?: Record<string, string>; }
export interface ValidationViolation { ruleId: string; severity: "warning" | "error"; location: string; message: string; blocking: boolean; }
export interface ValidationReport { mode: "draft" | "release"; input: string; blocking: boolean; violations: ValidationViolation[]; }
export interface MaslowColorTokens {
  navy: string; navyDeep: string; ink: string; text: string; muted: string; bodyMuted: string; meta: string; nearBlack: string;
  line: string; lineSoft: string; lineCard: string; offWhite: string; white: string; teal: string; tealText: string;
  purple: string; plum: string; gold: string; goldText: string; yellow: string; pink: string; coral: string;
  duotonePink: string; duotoneTeal: string; darkSurface: string;
  darkSurfaceRaised: string; darkLine: string; darkText: string; statusOpen: string; statusClosed: string; success: string; error: string;
}
export interface MaslowActionTokens { primary: string; primaryInk: string; primaryHover: string; inverse: string; inverseInk: string; signal: string; link: string; linkHover: string; focus: string; }
export interface MaslowTokens { version: string; color: Readonly<MaslowColorTokens>; action: Readonly<MaslowActionTokens>; font: Readonly<{ sans: string; display: string; mono: string }>; radius: Readonly<{ structural: string; capsule: string; circle: string }>; layout: Readonly<{ canvasMax: string; contentMax: string; sectionGap: string; cardGap: string }>; }
export declare const brandVersion: string;
export declare const evidenceStatuses: readonly EvidenceStatus[];
export declare const tokens: Readonly<MaslowTokens>;
export declare const actionTheme: Readonly<MaslowActionTokens>;
`);
write("npm/manifest.json", JSON.stringify(manifest, null, 2) + "\n");
copy("assets", "npm/assets");

copyShared("codex");
copyShared("claude");
write("codex/.codex-plugin/plugin.json", pluginManifest("codex"));
write("claude/.claude-plugin/plugin.json", pluginManifest("claude"));

copyShared("agent-plugin", { portableRoot: true });
copyShared("hermes", { portableRoot: true });
copyShared("openclaw", { portableRoot: true });
write("hermes/HARNESS.md", "# Hermes\n\nInstall this directory as a portable Agent Plugin. Run `hermes plugins doctor . --ci`, enable the plugin, then load the namespaced focused skill that matches the task.\n");
write("openclaw/HARNESS.md", "# OpenClaw\n\nInstall this directory with `openclaw skills install . --as maslow-brand-os`, then run `openclaw skills info maslow-brand-os` and `openclaw skills check`. The root `SKILL.md` routes to the focused guidance.\n");

write("chatgpt/maslow-brand-os/SKILL.md", chatGptSkill());
["src", "assets", "templates", "scripts"].forEach((path) => copy(path, `chatgpt/maslow-brand-os/${path}`));
copyArtifactStarters("chatgpt/maslow-brand-os");

write("generic/brand-contract.md", read("src/brand-contract.md"));
write("generic/VALIDATION.md", "# Validation\n\nRun `node scripts/validate.mjs --mode draft --input <file>` while editing and release mode before delivery. Native artifacts must also pass the artifact inspection command.\n");
copy("src/tokens.json", "generic/tokens.json");
copy("src/policies.json", "generic/policies.json");
copy("src", "generic/src");
copy("src/schemas", "generic/schemas");
copy("assets", "generic/assets");
copy("templates", "generic/templates");
copyArtifactStarters("generic");
copy("scripts", "generic/scripts");
copy("plugin.json", "generic/plugin.json");
copy("SKILL.md", "generic/SKILL.md");
copy("INSTALL.md", "generic/INSTALL.md");

console.log(`Built ${pkg.name} ${pkg.version} at ${out}`);
