import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");

const approvedDesignerLogos = [
  ["maslow-complete-black.png", 1700, 270, "60284c10bdbc92c9273439302889db92a52ca1296b9f9b9a066e68d34434f330"],
  ["maslow-complete-full-color.png", 1700, 270, "326967d7d60db24bb46f93dc7c8307025c48048d895137c55df48c6136a19132"],
  ["maslow-complete-white.png", 1700, 270, "59984dff39dfb57090fdb0002c562345408cb00d0acf5a6270d871a8bb46ba29"],
  ["maslow-symbol-black.png", 368, 253, "913f4ef4f402c1976b1e4432ba6bf2d5e962a87df9c2f8917df40b9eb0607ed8"],
  ["maslow-symbol-full-color.png", 366, 246, "356c6c7995c93cf9b52095e23e2d37856a73419b6c19a59de64fe9bea9ba866a"],
  ["maslow-symbol-webflow-full-color.png", 256, 256, "dc603b922ed0d7a0bf6df2ec1d54948bb3e4da4d50e6d35d9bbb719ffba487d1"],
  ["maslow-symbol-white.png", 374, 249, "01b83a860e3e6b6f8ea14f92e33647a96a1e96184bddabc6691a7ca4d580832a"],
];

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function archiveMediaHashes(path, prefix) {
  const listing = spawnSync("unzip", ["-Z1", path], { encoding: "utf8" });
  assert.equal(listing.status, 0, listing.stderr || listing.stdout);
  return listing.stdout.trim().split("\n")
    .filter((name) => name.startsWith(prefix))
    .map((name) => {
      const entry = spawnSync("unzip", ["-p", path, name], { encoding: null });
      assert.equal(entry.status, 0, String(entry.stderr || ""));
      return createHash("sha256").update(entry.stdout).digest("hex");
    });
}

function run(script, args = []) {
  return spawnSync(process.execPath, [resolve(root, script), ...args], {
    cwd: root,
    encoding: "utf8",
  });
}

test("designer-approved logo masters remain byte-identical and retain their original canvases", () => {
  for (const [name, width, height, expectedHash] of approvedDesignerLogos) {
    const path = resolve(root, "assets", "logos", name);
    assert.equal(existsSync(path), true, `${name} must be imported from the designer handoff`);
    const bytes = readFileSync(path);
    assert.equal(sha256(path), expectedHash, `${name} must never be redrawn or re-encoded`);
    assert.equal(bytes.readUInt32BE(16), width, `${name} width must remain unchanged`);
    assert.equal(bytes.readUInt32BE(20), height, `${name} height must remain unchanged`);
  }
});

test("editable native starters embed complete designer logos without re-encoding", () => {
  const fullColorHash = approvedDesignerLogos[1][3];
  const whiteHash = approvedDesignerLogos[2][3];
  const deckHashes = archiveMediaHashes(resolve(root, "artifacts/pptx/maslow-brand-starter.pptx"), "ppt/media/");
  assert.equal(deckHashes.includes(fullColorHash), true, "starter deck must embed the complete full-color master");
  assert.equal(deckHashes.includes(whiteHash), true, "starter deck must embed the complete white master");
  const blindDeckHashes = archiveMediaHashes(resolve(root, "artifacts/blind-build/maslow-workflow-brief.pptx"), "ppt/media/");
  assert.equal(blindDeckHashes.includes(fullColorHash), true, "blind-build deck must retain the complete full-color master");
  assert.equal(blindDeckHashes.includes(whiteHash), true, "blind-build deck must retain the complete white master");

  for (const name of ["maslow-proposal-template.docx", "maslow-memo-template.docx", "maslow-invoice-template.docx"]) {
    const hashes = archiveMediaHashes(resolve(root, "artifacts/docx", name), "word/media/");
    assert.equal(hashes.includes(fullColorHash), true, `${name} must embed the complete full-color master`);
  }
  const blindDocHashes = archiveMediaHashes(resolve(root, "artifacts/blind-build/maslow-workflow-proposal.docx"), "word/media/");
  assert.equal(blindDocHashes.includes(fullColorHash), true, "blind-build proposal must retain the complete full-color master");
});

test("social SVG starters embed the correct complete designer logo masters", () => {
  const fullColor = readFileSync(resolve(root, "assets/logos/maslow-complete-full-color.png")).toString("base64");
  const white = readFileSync(resolve(root, "assets/logos/maslow-complete-white.png")).toString("base64");
  const expected = [
    ["maslow-social-og-1200x630.svg", white],
    ["maslow-social-square-1080x1080.svg", fullColor],
    ["maslow-social-banner-1584x396.svg", white],
  ];
  for (const [name, logo] of expected) {
    const source = readFileSync(resolve(root, "artifacts/social", name), "utf8");
    assert.equal(source.includes(`data:image/png;base64,${logo}`), true, `${name} must embed the approved complete logo bytes`);
  }
});

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

test("release validation accepts an exact designer-approved logo asset", () => {
  const source = readFileSync(resolve(root, "fixtures/release-valid.html"), "utf8")
    .replace("</main>", '<img src="assets/logos/maslow-complete-full-color.png" alt="Maslow AI"></main>');
  const path = join(mkdtempSync(join(tmpdir(), "maslow-approved-logo-")), "artifact.html");
  writeFileSync(path, source);
  const result = run("scripts/validate.mjs", ["--mode", "release", "--input", path]);
  assert.equal(result.status, 0, result.stderr || result.stdout);
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
  assert.equal(manifest.version, "1.0.1");
  assert.equal(manifest.packageName, "@maslow-ai/brand-os");
  assert.equal(Object.keys(manifest.assetHashes).length >= 5, true);
});

test("package manifest publishes every immutable designer logo with explicit usage metadata", () => {
  const out = mkdtempSync(join(tmpdir(), "maslow-brand-os-logos-"));
  const result = run("scripts/build.mjs", ["--out", out]);
  assert.equal(result.status, 0, result.stderr || result.stdout);

  const manifest = JSON.parse(readFileSync(join(out, "npm", "manifest.json"), "utf8"));
  assert.deepEqual(
    manifest.logoAssets.map(({ id, path, width, height, sha256 }) => [id, path, width, height, sha256]),
    approvedDesignerLogos.map(([name, width, height, hash]) => [
      name.replace(/\.png$/, ""),
      `assets/logos/${name}`,
      width,
      height,
      hash,
    ]),
  );
  assert.equal(manifest.logoPolicy, "immutable-designer-master");
  assert.equal(typeof manifest.sourceHashes["src/logo-assets.json"], "string");
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
  assert.equal(pkg.version, "1.0.1");
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
