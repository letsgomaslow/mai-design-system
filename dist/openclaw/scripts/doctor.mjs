#!/usr/bin/env node
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function readJson(path) {
  try {
    return JSON.parse(readFileSync(join(root, path), "utf8"));
  } catch (error) {
    failures.push(`${path}: ${error.message}`);
    return null;
  }
}

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

const required = [
  "plugin.json",
  "SKILL.md",
  "INSTALL.md",
  "src/brand-contract.md",
  "src/tokens.json",
  "src/policies.json",
  "src/logo-assets.json",
  "skills/maslow-brand-core/SKILL.md",
  "skills/maslow-brand-review/SKILL.md",
  "scripts/validate.mjs",
];

for (const path of required) {
  if (!existsSync(join(root, path))) failures.push(`${path}: missing`);
}

const plugin = readJson("plugin.json");
const tokens = readJson("src/tokens.json");
const policies = readJson("src/policies.json");
const logos = readJson("src/logo-assets.json");

if (plugin && plugin.$schema !== "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json") {
  failures.push("plugin.json: unsupported Agent Plugins schema");
}
if (plugin && tokens && plugin.version !== tokens.version) failures.push("plugin.json and tokens version mismatch");
if (tokens && policies && tokens.version !== policies.version) failures.push("tokens and policies version mismatch");
if (tokens?.radius?.structural !== "0px") failures.push("tokens: structural radius must remain 0px");
if (tokens?.radius?.capsule !== "9999px") failures.push("tokens: capsule radius must be 9999px");

for (const logo of logos?.variants || []) {
  const path = join(root, logo.path);
  if (!existsSync(path)) {
    failures.push(`${logo.path}: missing designer master`);
  } else if (sha256(path) !== logo.sha256) {
    failures.push(`${logo.path}: designer master hash mismatch`);
  }
}

const report = {
  package: plugin?.name || "unknown",
  version: plugin?.version || "unknown",
  valid: failures.length === 0,
  failures,
};

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
if (failures.length) process.exitCode = 1;
