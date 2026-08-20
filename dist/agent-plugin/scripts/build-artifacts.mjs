#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const python = process.env.MASLOW_PYTHON || "python3";

function run(command, args, options = {}) {
  execFileSync(command, args, { cwd: root, stdio: "inherit", env: process.env, ...options });
}

function convertToPdf(files, destination) {
  mkdirSync(destination, { recursive: true });
  const profile = mkdtempSync(join(tmpdir(), "maslow-lo-"));
  run("soffice", [
    "--headless",
    `-env:UserInstallation=${pathToFileURL(profile).href}`,
    "--convert-to",
    "pdf",
    "--outdir",
    destination,
    ...files,
  ]);
}

function renderPdfs(directory, previewRoot) {
  if (!existsSync(directory)) return;
  for (const name of readdirSync(directory).filter((item) => item.endsWith(".pdf"))) {
    const stem = name.replace(/\.pdf$/i, "");
    const output = join(previewRoot, stem);
    mkdirSync(output, { recursive: true });
    run("pdftoppm", ["-png", "-r", "144", join(directory, name), join(output, "page")]);
  }
}

const previewRoot = join(root, "artifacts/previews/pdf");
rmSync(join(root, "artifacts/previews/docx"), { recursive: true, force: true });
rmSync(join(root, "artifacts/previews/pptx/undefined-paths.json"), { force: true });
rmSync(previewRoot, { recursive: true, force: true });
run(process.execPath, ["scripts/build-social.mjs"]);
run(python, ["scripts/build-docx.py"]);
run(process.execPath, ["scripts/build-pptx.mjs"]);
run(python, ["scripts/postprocess-pptx.py", "artifacts/pptx/maslow-brand-starter.pptx"]);
rmSync(join(root, "artifacts/pptx/maslow-brand-starter.pptx.inspect.ndjson"), { force: true });
run(python, ["scripts/build-blind-samples.py"]);

const pdfDir = join(root, "artifacts/pdf");
rmSync(pdfDir, { recursive: true, force: true });
convertToPdf([
  join(root, "artifacts/pptx/maslow-brand-starter.pptx"),
  ...readdirSync(join(root, "artifacts/docx")).filter((name) => name.endsWith(".docx")).map((name) => join(root, "artifacts/docx", name)),
], pdfDir);

const blindDir = join(root, "artifacts/blind-build");
const blindPdfDir = join(blindDir, "pdf");
rmSync(blindPdfDir, { recursive: true, force: true });
convertToPdf(readdirSync(blindDir)
  .filter((name) => name.endsWith(".pptx") || name.endsWith(".docx"))
  .map((name) => join(blindDir, name)), blindPdfDir);

renderPdfs(pdfDir, previewRoot);
renderPdfs(blindPdfDir, join(previewRoot, "blind-build"));
cpSync(join(root, "fixtures/blind-build/website-cta.html"), join(blindDir, "website-cta.html"));
run(python, ["scripts/inspect-artifacts.py", "--root", root, "--out", join(root, "artifacts/validation/artifact-report.json")]);
run(process.execPath, ["scripts/validate.mjs", "--mode", "release", "--input", join(blindDir, "website-cta.html")]);
console.log(`Built and inspected native artifacts in ${basename(join(root, "artifacts"))}/`);
