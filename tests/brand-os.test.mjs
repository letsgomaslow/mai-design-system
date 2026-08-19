import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");

function run(script, args = []) {
  return spawnSync(process.execPath, [resolve(root, script), ...args], {
    cwd: root,
    encoding: "utf8",
  });
}

test("canonical contract exposes the approved action, shape, and evidence semantics", () => {
  const tokenPath = resolve(root, "src/tokens.json");
  const policyPath = resolve(root, "src/policies.json");
  assert.equal(existsSync(tokenPath), true, "src/tokens.json must exist");
  assert.equal(existsSync(policyPath), true, "src/policies.json must exist");

  const tokens = JSON.parse(readFileSync(tokenPath, "utf8"));
  const policies = JSON.parse(readFileSync(policyPath, "utf8"));
  assert.deepEqual(tokens.action, {
    primary: "#192332",
    primaryInk: "#FFFFFF",
    primaryHover: "#121D35",
    inverse: "#FFFFFF",
    inverseInk: "#192332",
    signal: "#EE7BB3",
    link: "#9D4B8E",
    linkHover: "#654C8F",
    focus: "#401877",
  });
  assert.equal(tokens.radius.structural, "0px");
  assert.deepEqual(policies.evidence.statuses, [
    "production",
    "modeled",
    "illustrative",
    "in_preparation",
  ]);
  assert.match(policies.messaging.primaryPosition, /AI employees for the work that waits/);
});

test("release validation accepts a compliant artifact", () => {
  const result = run("scripts/validate.mjs", [
    "--mode",
    "release",
    "--input",
    "fixtures/release-valid.html",
  ]);
  assert.equal(result.status, 0, result.stderr || result.stdout);
  const report = JSON.parse(result.stdout);
  assert.equal(report.blocking, false);
  assert.equal(report.violations.length, 0);
});

test("release validation blocks placeholders, unsupported claims, pink fills, and structural rounding", () => {
  const result = run("scripts/validate.mjs", [
    "--mode",
    "release",
    "--input",
    "fixtures/release-invalid.html",
  ]);
  assert.equal(result.status, 1, result.stderr || result.stdout);
  const report = JSON.parse(result.stdout);
  assert.equal(report.blocking, true);
  assert.deepEqual(
    new Set(report.violations.map(({ ruleId }) => ruleId)),
    new Set([
      "copy.em-dash",
      "copy.hype",
      "content.unresolved-variable",
      "evidence.unlabeled-claim",
      "visual.pink-fill",
      "visual.structural-radius",
    ]),
  );
});

test("release validation blocks unsupported fonts, colors, logos, and unsourced production claims", () => {
  const result = run("scripts/validate.mjs", [
    "--mode",
    "release",
    "--input",
    "fixtures/release-invalid-extended.html",
  ]);
  assert.equal(result.status, 1, result.stderr || result.stdout);
  const report = JSON.parse(result.stdout);
  const ids = new Set(report.violations.map(({ ruleId }) => ruleId));
  [
    "asset.unapproved-logo",
    "evidence.missing-source",
    "visual.pink-readable-text",
    "visual.unapproved-color",
    "visual.unsupported-font",
  ].forEach((id) => assert.equal(ids.has(id), true, `${id} must block release`));
});

test("a small pink signal remains valid", () => {
  const source = readFileSync(resolve(root, "templates/social-og/social-og-1200x630.html"), "utf8")
    .replaceAll(/\{\{[^}]+\}\}/g, "illustrative")
    .replace("illustrative · illustrative", "illustrative · Example only");
  const path = join(mkdtempSync(join(tmpdir(), "maslow-signal-")), "social.html");
  writeFileSync(path, source);
  const result = run("scripts/validate.mjs", ["--mode", "release", "--input", path]);
  assert.equal(result.status, 0, result.stderr || result.stdout);
});

test("build emits deterministic package exports and platform adapters", () => {
  const out = mkdtempSync(join(tmpdir(), "maslow-brand-os-"));
  const result = run("scripts/build.mjs", ["--out", out]);
  assert.equal(result.status, 0, result.stderr || result.stdout);

  const required = [
    "npm/tokens.css",
    "npm/tokens.js",
    "npm/tokens.d.ts",
    "npm/manifest.json",
    "codex/.codex-plugin/plugin.json",
    "claude/.claude-plugin/plugin.json",
    "chatgpt/maslow-brand-os/SKILL.md",
    "chatgpt/maslow-brand-os/src/tokens.json",
    "generic/brand-contract.md",
    "generic/schemas/artifact-brief.schema.json",
    "generic/scripts/validate.mjs",
    "generic/templates/social-og/social-og-1200x630.html",
  ];
  required.forEach((path) => {
    assert.equal(existsSync(join(out, path)), true, `${path} must be generated`);
  });

  const manifest = JSON.parse(readFileSync(join(out, "npm/manifest.json"), "utf8"));
  assert.equal(manifest.version, "1.0.0");
  assert.equal(manifest.packageName, "@maslow-ai/brand-os");
  assert.equal(Object.keys(manifest.assetHashes).length >= 5, true);
});

test("focused skills stay concise and legacy names are dependency-only wrappers", () => {
  const focused = [
    "maslow-brand-core",
    "maslow-messaging-campaigns",
    "maslow-web-interface",
    "maslow-presentations",
    "maslow-documents-pdf",
    "maslow-social-imagery",
    "maslow-brand-review",
  ];
  const legacy = [
    "maslow-brand",
    "maslow-brand-strategy",
    "maslow-components",
    "maslow-dev-guide",
    "maslow-imagery",
    "maslow-logo",
    "maslow-site-builder",
  ];

  focused.forEach((name) => {
    const path = resolve(root, "skills", name, "SKILL.md");
    assert.equal(existsSync(path), true, `${name} must exist`);
    const source = readFileSync(path, "utf8");
    assert.match(source, /^---\nname: [a-z0-9-]+\ndescription: Use when/m);
    assert.equal(source.trim().split(/\s+/).length < 500, true, `${name} must stay concise`);
    if (name !== "maslow-brand-core") {
      assert.match(source, /REQUIRED SUB-SKILL.*maslow-brand-core/);
    }
  });

  legacy.forEach((name) => {
    const source = readFileSync(resolve(root, "skills", name, "SKILL.md"), "utf8");
    assert.match(source, /REQUIRED SUB-SKILL/);
    assert.doesNotMatch(source, /#[0-9A-Fa-f]{6}/);
  });
});

test("human guidance and CSS aliases agree with the canonical contract", () => {
  const guidance = ["readme.md", "DESIGN.md", "SKILL.md"]
    .map((path) => readFileSync(resolve(root, path), "utf8"))
    .join("\n");
  const colors = readFileSync(resolve(root, "tokens/colors.css"), "utf8");
  const spacing = readFileSync(resolve(root, "tokens/spacing.css"), "utf8");

  assert.match(guidance, /navy[^\n]+primary action/i);
  assert.match(guidance, /pink[^\n]+signal/i);
  assert.match(guidance, /zero(?:-| )radius|0px structural/i);
  assert.doesNotMatch(guidance, /pink (?:primary|button)|pink means click|one (?:deliberate )?pink action/i);
  assert.doesNotMatch(guidance, /teal (?:outline|focus)|focus[^\n]+#73C1AE/i);
  assert.match(colors, /--action-button:\s*var\(--maslow-dark-navy\)/);
  assert.match(colors, /--action-link:\s*#9D4B8E/);
  assert.match(colors, /--focus-ring:\s*#401877/);
  assert.match(spacing, /--radius-structural:\s*0px/);
});

test("component primitives use square structure and the approved action hierarchy", () => {
  const button = readFileSync(resolve(root, "components/actions/CTAButton.jsx"), "utf8");
  const link = readFileSync(resolve(root, "components/actions/CTALink.jsx"), "utf8");
  const structural = [
    "components/actions/CTAButton.jsx",
    "components/badges/PillBadge.jsx",
    "components/badges/StatusBadge.jsx",
    "components/cards/CaseStudyCard.jsx",
  ].map((path) => readFileSync(resolve(root, path), "utf8"))
    .join("\n")
    .replace(/<span style=\{\{width:6,height:6,borderRadius:"50%"[^>]+\/>/g, "");

  assert.match(button, /primary:\{background:"var\(--action-button\)"/);
  assert.match(button, /inverse:\{background:"var\(--action-inverse\)"/);
  assert.match(button, /borderRadius:0/);
  assert.match(link, /var\(--action-link\)/);
  assert.doesNotMatch(structural, /borderRadius:(?:[1-9]\d*|"(?:[1-9]\d*px|50%|9999px)")/);
});

test("package declares the public Brand OS exports", () => {
  const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
  assert.equal(pkg.version, "1.0.0");
  assert.deepEqual(Object.keys(pkg.exports).sort(), [
    "./assets/*",
    "./manifest",
    "./tokens",
    "./tokens.css",
  ]);
});

test("human-facing previews contain no retired pink, fake metrics, or structural rounding", () => {
  const htmlFiles = ["components", "guidelines", "templates"]
    .flatMap((directory) => readdirSync(resolve(root, directory), { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
      .map((entry) => resolve(entry.parentPath, entry.name)));
  htmlFiles.push(resolve(root, "Maslow Design System 2026.dc.html"), resolve(root, "Template Gallery.html"));
  const source = htmlFiles.map((path) => readFileSync(path, "utf8")).join("\n");
  assert.doesNotMatch(source, /#DA85B2|\b93%\b|1\.33×/i);
  assert.doesNotMatch(source, /border-radius:\s*(?:[1-9]\d*px|9999px)/i);
  assert.equal(readdirSync(resolve(root, "test-builds")).some((name) => name.endsWith(".html")), false);
});

test("the root Brand OS hub passes release validation", () => {
  const result = run("scripts/validate.mjs", [
    "--mode",
    "release",
    "--input",
    "Maslow Design System 2026.dc.html",
  ]);
  assert.equal(result.status, 0, result.stderr || result.stdout);
});
