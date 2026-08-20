#!/usr/bin/env node
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { Presentation, PresentationFile } = require("@oai/artifact-tool");
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = join(root, "artifacts/pptx");
const previewDir = join(root, "artifacts/previews/pptx");

const C = {
  navy: "#192332",
  band: "#121D35",
  white: "#FFFFFF",
  offWhite: "#F6F7F9",
  text: "#333333",
  muted: "#666666",
  meta: "#A5A5A5",
  line: "#E1E1E1",
  darkLine: "#3A4A6B",
  darkText: "#B8C4D9",
  teal: "#73C1AE",
  purple: "#654C8F",
  plum: "#A070A6",
  orange: "#EBA93D",
  yellow: "#FFF860",
  pink: "#EE7BB3",
};

const FONT = "Manrope";
const MONO = "IBM Plex Mono";
const slideSize = { width: 1280, height: 720 };

function addText(slide, name, text, position, style) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    name,
    position,
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  shape.text = text;
  shape.text.style = { fontFamily: FONT, color: C.text, fontSize: 20, ...style };
  return shape;
}

function addRect(slide, name, position, fill, lineFill = "none", lineWidth = 0) {
  return slide.shapes.add({
    geometry: "rect",
    name,
    position,
    fill,
    line: { style: "solid", fill: lineFill, width: lineWidth },
  });
}

async function logoBytes(path) {
  const bytes = await fs.readFile(path);
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

function setNotes(slide, text) {
  slide.speakerNotes.textFrame.setText(text);
  slide.speakerNotes.setVisible(true);
}

function addFooter(slide, ink, folio) {
  addText(slide, `footer-wordmark-${folio}`, "MASLOW AI", { left: 92, top: 668, width: 180, height: 24 }, {
    fontFamily: MONO,
    fontSize: 12,
    color: ink,
    bold: true,
    letterSpacing: 2,
  });
  addText(slide, `footer-folio-${folio}`, `MASLOW AI · ${folio}`, { left: 1008, top: 668, width: 180, height: 24 }, {
    fontFamily: MONO,
    fontSize: 11,
    color: ink,
    alignment: "right",
  });
}

function addLogo(slide, bytes, alt) {
  slide.images.add({
    blob: bytes,
    contentType: "image/png",
    alt,
    fit: "contain",
    geometry: "rect",
    borderRadius: 0,
    position: { left: 92, top: 62, width: 280, height: 45 },
  });
}

function createLayout(presentation, master, name, background, placeholders) {
  const layout = presentation.layouts.add(name);
  layout.setParentLayoutId(master.id);
  layout.shapes.add({
    geometry: "rect",
    name: `${name} background`,
    position: { left: 0, top: 0, width: slideSize.width, height: slideSize.height },
    fill: background === "dk2" ? C.band : background === "bg2" ? C.offWhite : C.white,
    line: { style: "solid", fill: "none", width: 0 },
  });
  for (const config of placeholders) {
    const placeholder = layout.shapes.addPlaceholder(`${name} ${config.type} ${config.index}`);
    placeholder.placeholder.type = config.type;
    placeholder.placeholder.index = config.index;
    placeholder.position = config.position;
    placeholder.text = config.text;
  }
  return layout;
}

function createLayouts(presentation, master) {
  const title = (position, type = "title", index = 0) => ({ type, index, geometry: "textbox", position, text: `{{${type.toUpperCase()}}}` });
  return {
    title: createLayout(presentation, master, "01 Title", "dk2", [
      title({ left: 92, top: 270, width: 1020, height: 220 }),
      title({ left: 92, top: 512, width: 900, height: 70 }, "subtitle"),
    ]),
    section: createLayout(presentation, master, "02 Section", "dk2", [
      title({ left: 92, top: 430, width: 950, height: 130 }),
      title({ left: 92, top: 386, width: 650, height: 34 }, "subtitle"),
    ]),
    content: createLayout(presentation, master, "03 Content", "bg1", [
      title({ left: 92, top: 102, width: 1030, height: 82 }),
      title({ left: 92, top: 210, width: 1030, height: 360 }, "body"),
    ]),
    evidence: createLayout(presentation, master, "04 Evidence", "dk2", [
      title({ left: 92, top: 102, width: 1030, height: 82 }),
      title({ left: 92, top: 230, width: 1030, height: 330 }, "body"),
    ]),
    quote: createLayout(presentation, master, "05 Quote", "bg2", [
      title({ left: 130, top: 230, width: 1000, height: 230 }),
      title({ left: 130, top: 490, width: 900, height: 70 }, "subtitle"),
    ]),
    closing: createLayout(presentation, master, "06 Closing", "bg1", [
      title({ left: 92, top: 220, width: 1020, height: 170 }),
      title({ left: 92, top: 430, width: 700, height: 74 }, "subtitle"),
    ]),
  };
}

async function build() {
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(previewDir, { recursive: true });
  const brandVersion = JSON.parse(await fs.readFile(join(root, "package.json"), "utf8")).version;
  const [whiteLogo, fullColorLogo] = await Promise.all([
    logoBytes(join(root, "assets/logos/maslow-complete-white.png")),
    logoBytes(join(root, "assets/logos/maslow-complete-full-color.png")),
  ]);
  const presentation = Presentation.create({ slideSize });
  presentation.theme.colorScheme = {
    name: `Maslow Brand OS ${brandVersion}`,
    themeColors: {
      accent1: C.navy, accent2: C.teal, accent3: C.purple, accent4: C.orange,
      accent5: C.pink, accent6: C.yellow, bg1: C.white, bg2: C.offWhite,
      tx1: C.navy, tx2: C.muted, dk1: C.text, dk2: C.band,
      lt1: C.white, lt2: C.line, hlink: "#9D4B8E", folHlink: C.purple,
    },
  };
  const master = presentation.masters.add("Maslow Brand Master");
  const layouts = createLayouts(presentation, master);

  const slide1 = presentation.slides.add();
  slide1.setLayout(layouts.title); slide1.background.fill = C.band;
  addLogo(slide1, whiteLogo, "Maslow AI complete white logo");
  addText(slide1, "title-eyebrow", "{{DATE}} · {{AUDIENCE}}", { left: 92, top: 238, width: 700, height: 30 }, { fontFamily: MONO, fontSize: 15, bold: true, color: C.teal, letterSpacing: 3 });
  addText(slide1, "title-heading", "AI employees for the work that waits", { left: 92, top: 286, width: 1040, height: 196 }, { fontSize: 58, bold: true, color: C.white });
  addText(slide1, "title-subtitle", "{{PRESENTER}} · {{ENGAGEMENT}}", { left: 92, top: 520, width: 840, height: 44 }, { fontSize: 20, color: C.darkText });
  setNotes(slide1, "Layout 01 Title. Replace all variables. Keep the external position intact unless an approved campaign brief requires a narrower headline.");

  const slide2 = presentation.slides.add();
  slide2.setLayout(layouts.section); slide2.background.fill = C.band;
  addText(slide2, "section-step-marker", "02", { left: 930, top: 60, width: 250, height: 220 }, { fontSize: 132, bold: true, color: C.teal, alignment: "right" });
  addText(slide2, "section-eyebrow", "{{SECTION_LABEL}}", { left: 92, top: 388, width: 720, height: 34 }, { fontFamily: MONO, fontSize: 15, bold: true, color: C.teal, letterSpacing: 3 });
  addText(slide2, "section-heading", "{{SECTION_TITLE}}", { left: 92, top: 438, width: 960, height: 116 }, { fontSize: 52, bold: true, color: C.white });
  addRect(slide2, "section-signal", { left: 92, top: 584, width: 64, height: 4 }, C.pink);
  setNotes(slide2, "Layout 02 Section. The pink rule is a small signal. Keep all readable text in navy, white, teal, or accessible purple.");

  const slide3 = presentation.slides.add();
  slide3.setLayout(layouts.content); slide3.background.fill = C.white;
  addText(slide3, "content-eyebrow", "{{SECTION_NUMBER}} · {{SECTION_LABEL}}", { left: 92, top: 62, width: 700, height: 28 }, { fontFamily: MONO, fontSize: 13, bold: true, color: C.purple, letterSpacing: 3 });
  addText(slide3, "content-heading", "{{SLIDE_TITLE}}", { left: 92, top: 104, width: 1030, height: 74 }, { fontSize: 40, bold: true, color: C.navy });
  addRect(slide3, "content-top-rule", { left: 92, top: 210, width: 1096, height: 2 }, C.navy);
  const rows = [
    ["01", "{{WORKFLOW_ONE}}", "{{OWNER_ONE}} owns {{DELIVERABLE_ONE}}."],
    ["02", "{{WORKFLOW_TWO}}", "{{OWNER_TWO}} owns {{DELIVERABLE_TWO}}."],
    ["03", "{{WORKFLOW_THREE}}", "{{OWNER_THREE}} owns {{DELIVERABLE_THREE}}."],
  ];
  rows.forEach(([number, heading, body], index) => {
    const top = 232 + index * 128;
    addText(slide3, `content-row-${number}-number`, number, { left: 92, top, width: 70, height: 36 }, { fontSize: 18, bold: true, color: C.teal });
    addText(slide3, `content-row-${number}-heading`, heading, { left: 186, top, width: 370, height: 62 }, { fontSize: 22, bold: true, color: C.navy });
    addText(slide3, `content-row-${number}-body`, body, { left: 580, top, width: 608, height: 66 }, { fontSize: 18, color: C.muted });
    addRect(slide3, `content-row-${number}-rule`, { left: 92, top: top + 94, width: 1096, height: 1 }, C.line);
  });
  addFooter(slide3, C.meta, "{{FOLIO}}");
  setNotes(slide3, "Layout 03 Content. Each row names the waiting workflow, responsible owner, and deliverable. Keep one communication job on the slide.");

  const slide4 = presentation.slides.add();
  slide4.setLayout(layouts.evidence); slide4.background.fill = C.band;
  addText(slide4, "evidence-eyebrow", "{{SECTION_NUMBER}} · EVIDENCE", { left: 92, top: 64, width: 700, height: 28 }, { fontFamily: MONO, fontSize: 13, bold: true, color: C.teal, letterSpacing: 3 });
  addText(slide4, "evidence-heading", "{{SLIDE_TITLE}}", { left: 92, top: 108, width: 1030, height: 74 }, { fontSize: 40, bold: true, color: C.white });
  const evidence = [
    ["{{VALUE_1}}", "{{CLAIM_1}}", C.teal, "ONE"],
    ["{{VALUE_2}}", "{{CLAIM_2}}", C.plum, "TWO"],
    ["{{VALUE_3}}", "{{CLAIM_3}}", C.yellow, "THREE"],
  ];
  evidence.forEach(([value, claim, color, suffix], index) => {
    const left = 92 + index * 374;
    addRect(slide4, `evidence-${suffix}-rule`, { left, top: 236, width: 330, height: 1 }, C.darkLine);
    addText(slide4, `evidence-${suffix}-value`, value, { left, top: 272, width: 330, height: 88 }, { fontSize: 38, color });
    addText(slide4, `evidence-${suffix}-claim`, claim, { left, top: 382, width: 330, height: 84 }, { fontSize: 19, color: C.white });
    addText(slide4, `evidence-${suffix}-source`, `{{EVIDENCE_STATUS_${suffix}}} · {{SOURCE_${suffix}}}`, { left, top: 500, width: 330, height: 48 }, { fontFamily: MONO, fontSize: 11, color: C.darkText });
  });
  addFooter(slide4, C.darkText, "{{FOLIO}}");
  setNotes(slide4, "Layout 04 Evidence. Every claim requires production, modeled, illustrative, or in_preparation plus a source. Put longer provenance here in speaker notes.");

  const slide5 = presentation.slides.add();
  slide5.setLayout(layouts.quote); slide5.background.fill = C.offWhite;
  addText(slide5, "quote-mark", "“", { left: 130, top: 102, width: 160, height: 120 }, { fontSize: 92, bold: true, color: C.teal });
  addText(slide5, "quote-text", "{{VERIFIED_QUOTE}}", { left: 130, top: 238, width: 1000, height: 210 }, { fontSize: 36, bold: true, color: C.navy });
  addText(slide5, "quote-attribution", "{{ATTRIBUTION}}", { left: 130, top: 496, width: 820, height: 34 }, { fontSize: 16, color: C.muted });
  addText(slide5, "quote-source", "{{EVIDENCE_STATUS}} · {{SOURCE}}", { left: 130, top: 542, width: 820, height: 32 }, { fontFamily: MONO, fontSize: 11, color: C.purple });
  setNotes(slide5, "Layout 05 Quote. Do not release an unsourced quote. If the quote is an illustrative writing pattern, label it illustrative on the slide.");

  const slide6 = presentation.slides.add();
  slide6.setLayout(layouts.closing); slide6.background.fill = C.white;
  addLogo(slide6, fullColorLogo, "Maslow AI complete full-color logo");
  addText(slide6, "closing-heading", "{{NEXT_ACTION_HEADLINE}}", { left: 92, top: 224, width: 1050, height: 150 }, { fontSize: 52, bold: true, color: C.navy });
  addRect(slide6, "closing-action", { left: 92, top: 424, width: 420, height: 72 }, C.navy);
  addText(slide6, "closing-action-label", "{{CTA_LABEL}}", { left: 120, top: 446, width: 350, height: 28 }, { fontSize: 16, bold: true, color: C.white, letterSpacing: 2 });
  addRect(slide6, "closing-action-signal", { left: 92, top: 492, width: 48, height: 4 }, C.pink);
  addText(slide6, "closing-contact", "{{CONTACT}}", { left: 92, top: 536, width: 700, height: 34 }, { fontFamily: MONO, fontSize: 13, color: C.muted, letterSpacing: 2 });
  addFooter(slide6, C.meta, "{{FOLIO}}");
  setNotes(slide6, "Layout 06 Closing. End on one explicit next action. The action is navy on white; pink remains a small signal.");

  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    const png = await presentation.export({ slide, format: "png", scale: 1 });
    await fs.writeFile(join(previewDir, `${stem}.png`), new Uint8Array(await png.arrayBuffer()));
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(join(previewDir, `${stem}.layout.json`), await layout.text());
  }
  const montage = await presentation.export({ format: "webp", montage: true, scale: 1 });
  await fs.writeFile(join(previewDir, "maslow-brand-starter-montage.webp"), new Uint8Array(await montage.arrayBuffer()));
  const snapshot = await presentation.inspect({ kind: "slide,textbox,shape,image,notes,layout", maxChars: 50000 });
  await fs.writeFile(join(previewDir, "maslow-brand-starter.inspect.ndjson"), snapshot.ndjson);
  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(join(outputDir, "maslow-brand-starter.pptx"));
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
