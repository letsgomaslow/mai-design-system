#!/usr/bin/env node
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = join(root, "artifacts/social");

const C = { navy: "#192332", band: "#121D35", white: "#FFFFFF", off: "#F6F7F9", teal: "#73C1AE", purple: "#654C8F", pink: "#EE7BB3", muted: "#666666", darkText: "#B8C4D9" };

function fontsCss(manrope, mono) {
  return `@font-face{font-family:Manrope;src:url(data:font/ttf;base64,${manrope}) format('truetype')}@font-face{font-family:IBMPlexMono;src:url(data:font/ttf;base64,${mono}) format('truetype')}.sans{font-family:Manrope,sans-serif}.mono{font-family:IBMPlexMono,monospace}`;
}

function logoPng(bytes, x, y, width, height) {
  return `<image href="data:image/png;base64,${bytes}" x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet"/>`;
}

function og(fonts, logo) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc"><title id="title">Maslow AI social link card</title><desc id="desc">Navy campaign card with Maslow positioning and a working session action.</desc><style>${fonts}</style><rect width="1200" height="630" fill="${C.band}"/><rect x="78" y="64" width="44" height="4" fill="${C.pink}"/>${logoPng(logo,78,493,240,38)}<text class="mono" x="78" y="124" fill="${C.teal}" font-size="16" font-weight="500" letter-spacing="4">MASLOW AI · BRAND STARTER</text><text class="sans" x="78" y="238" fill="${C.white}" font-size="64" font-weight="600"><tspan x="78">AI employees for the work</tspan><tspan x="78" dy="76">that waits</tspan></text><text class="mono" x="78" y="424" fill="${C.darkText}" font-size="13" letter-spacing="2">ILLUSTRATIVE · TEMPLATE PREVIEW</text><rect x="850" y="490" width="272" height="56" fill="${C.white}"/><text class="sans" x="986" y="525" fill="${C.navy}" font-size="14" font-weight="700" text-anchor="middle" letter-spacing="1">BOOK A WORKING SESSION</text></svg>`;
}

function square(fonts, logo) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080" role="img" aria-labelledby="title desc"><title id="title">Maslow AI square social card</title><desc id="desc">Off-white campaign card with Maslow positioning and an illustrative label.</desc><style>${fonts}</style><rect width="1080" height="1080" fill="${C.off}"/>${logoPng(logo,86,72,280,45)}<text class="mono" x="86" y="294" fill="${C.purple}" font-size="18" font-weight="500" letter-spacing="4">MASLOW AI · BRAND STARTER</text><text class="sans" x="86" y="412" fill="${C.navy}" font-size="76" font-weight="600"><tspan x="86">AI employees for</tspan><tspan x="86" dy="90">the work that waits</tspan></text><rect x="86" y="636" width="72" height="5" fill="${C.pink}"/><text class="mono" x="86" y="704" fill="${C.muted}" font-size="15" letter-spacing="2">ILLUSTRATIVE · TEMPLATE PREVIEW</text><text class="sans" x="86" y="970" fill="${C.navy}" font-size="19" font-weight="700">BOOK A WORKING SESSION</text><text class="mono" x="994" y="970" fill="${C.purple}" font-size="14" text-anchor="end" letter-spacing="2">MASLOW AI</text></svg>`;
}

function banner(fonts, logo) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1584" height="396" viewBox="0 0 1584 396" role="img" aria-labelledby="title desc"><title id="title">Maslow AI LinkedIn banner</title><desc id="desc">Navy banner with the Maslow logo, positioning, and a working session action.</desc><style>${fonts}</style><rect width="1584" height="396" fill="${C.band}"/>${logoPng(logo,104,52,250,40)}<text class="mono" x="386" y="80" fill="${C.teal}" font-size="15" font-weight="500" letter-spacing="3">BRAND STARTER</text><text class="sans" x="104" y="210" fill="${C.white}" font-size="54" font-weight="600">AI employees for the work that waits</text><rect x="104" y="318" width="48" height="4" fill="${C.pink}"/><text class="mono" x="180" y="322" fill="${C.darkText}" font-size="11" letter-spacing="2">ILLUSTRATIVE · TEMPLATE PREVIEW</text><text class="sans" x="1480" y="322" fill="${C.white}" font-size="15" font-weight="700" text-anchor="end">BOOK A WORKING SESSION</text></svg>`;
}

async function writeAsset(name, svg) {
  const svgPath = join(outputDir, `${name}.svg`);
  const pngPath = join(outputDir, `${name}.png`);
  await fs.writeFile(svgPath, svg);
  await sharp(Buffer.from(svg)).png().toFile(pngPath);
}

async function build() {
  await fs.mkdir(outputDir, { recursive: true });
  const [manrope, mono, whiteLogo, fullColorLogo] = await Promise.all([
    fs.readFile(join(root, "assets/fonts/Manrope-Variable.ttf"), "base64"),
    fs.readFile(join(root, "assets/fonts/IBMPlexMono-Medium.ttf"), "base64"),
    fs.readFile(join(root, "assets/logos/maslow-complete-white.png"), "base64"),
    fs.readFile(join(root, "assets/logos/maslow-complete-full-color.png"), "base64"),
  ]);
  const fonts = fontsCss(manrope, mono);
  await Promise.all([
    writeAsset("maslow-social-og-1200x630", og(fonts, whiteLogo)),
    writeAsset("maslow-social-square-1080x1080", square(fonts, fullColorLogo)),
    writeAsset("maslow-social-banner-1584x396", banner(fonts, whiteLogo)),
  ]);
  await fs.copyFile(join(root, "templates/social-campaign-brief.json"), join(outputDir, "campaign-brief.json"));
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
