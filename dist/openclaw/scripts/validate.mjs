#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "./lib/args.mjs";
import { validateSource } from "./lib/validator.mjs";

const args = parseArgs(process.argv.slice(2));
const mode = args.mode || "draft";
const input = args.input;

if (!input || !["draft", "release"].includes(mode)) {
  console.error("Usage: node scripts/validate.mjs --mode draft|release --input <path>");
  process.exit(2);
}

const path = resolve(input);
const report = validateSource(readFileSync(path, "utf8"), input, mode);
console.log(JSON.stringify(report, null, 2));
process.exitCode = report.blocking ? 1 : 0;
