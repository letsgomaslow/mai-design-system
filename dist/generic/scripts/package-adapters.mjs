#!/usr/bin/env node
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, utimesSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const dist = join(root, "dist");
const release = join(root, "release");
const epoch = new Date("2020-01-01T00:00:00Z");

function normalizeTimes(path) {
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    const child = join(path, entry.name);
    if (entry.isDirectory()) normalizeTimes(child);
    utimesSync(child, epoch, epoch);
  }
  utimesSync(path, epoch, epoch);
}

function sha(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

if (!existsSync(join(dist, "npm"))) execFileSync(process.execPath, [join(root, "scripts/build.mjs")], { cwd: root, stdio: "inherit" });
mkdirSync(release, { recursive: true });
const checksums = {};
for (const adapter of ["codex", "claude", "chatgpt", "generic", "npm"]) {
  const source = join(dist, adapter);
  if (!statSync(source).isDirectory()) throw new Error(`Missing adapter distribution: ${source}`);
  normalizeTimes(source);
  const filename = `maslow-brand-os-${adapter}-v${pkg.version}.zip`;
  const destination = join(release, filename);
  rmSync(destination, { force: true });
  execFileSync("zip", ["-X", "-q", "-r", destination, "."], { cwd: source });
  checksums[filename] = sha(destination);
}
writeFileSync(join(release, "SHA256SUMS.json"), JSON.stringify({ version: pkg.version, files: checksums }, null, 2) + "\n");
console.log(`Packaged ${Object.keys(checksums).length} Brand OS distributions in ${release}`);
