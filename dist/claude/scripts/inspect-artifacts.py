#!/usr/bin/env python3
"""Inspect native Brand OS artifacts and emit the shared ValidationReport shape."""

from argparse import ArgumentParser
from pathlib import Path
import json
import re
import zipfile

from PIL import Image
from pypdf import PdfReader
from lxml import etree

VARIABLE = re.compile(r"\{\{[^}]+\}\}")
W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
WP_NS = "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
NS = {"w": W_NS, "wp": WP_NS}


class Report:
    def __init__(self, root: Path):
        self.root = root
        self.violations = []

    def add(self, rule_id, path, message, blocking=True, severity=None):
        self.violations.append({
            "ruleId": rule_id,
            "severity": severity or ("error" if blocking else "warning"),
            "location": str(path.relative_to(self.root)),
            "message": message,
            "blocking": blocking,
        })

    def output(self):
        return {
            "mode": "release",
            "input": str(self.root),
            "blocking": any(item["blocking"] for item in self.violations),
            "violations": self.violations,
        }


def archive_text(path: Path) -> str:
    with zipfile.ZipFile(path) as archive:
        return "\n".join(
            archive.read(name).decode("utf-8", errors="ignore")
            for name in archive.namelist()
            if name.endswith((".xml", ".rels"))
        )


def is_template(path: Path) -> bool:
    return "template" in path.name or "starter" in path.name


def inspect_pptx(path: Path, report: Report):
    try:
        source = archive_text(path)
        with zipfile.ZipFile(path) as archive:
            names = archive.namelist()
            slides = [name for name in names if re.fullmatch(r"ppt/slides/slide\d+\.xml", name)]
            layouts = [name for name in names if re.fullmatch(r"ppt/slideLayouts/slideLayout\d+\.xml", name)]
            if len(slides) != 6:
                report.add("pptx.slide-count", path, f"Expected six slides; found {len(slides)}.")
            if len(layouts) < 6:
                report.add("pptx.layout-count", path, f"Expected at least six editable layouts; found {len(layouts)}.")
            if "ppt/theme/theme1.xml" not in names:
                report.add("pptx.theme", path, "Theme colors and fonts are missing.")
        if "Manrope" not in source or "IBM Plex Mono" not in source:
            report.add("font.required", path, "The deck must reference Manrope and IBM Plex Mono.")
        if VARIABLE.search(source) and not is_template(path):
            report.add("content.unresolved-variable", path, "Release deck contains unresolved variables.")
        image_nodes = re.findall(r"<p:cNvPr\b[^>]*?(?:descr|title)=\"[^\"]+\"", source)
        if "ppt/media/" in "\n".join(zipfile.ZipFile(path).namelist()) and not image_nodes:
            report.add("pptx.image-alt", path, "Deck images require alternative text.")
    except (zipfile.BadZipFile, KeyError) as error:
        report.add("pptx.integrity", path, f"PPTX package is invalid: {error}")


def inspect_docx(path: Path, report: Report):
    try:
        source = archive_text(path)
        with zipfile.ZipFile(path) as archive:
            document = etree.fromstring(archive.read("word/document.xml"))
            story_parts = [name for name in archive.namelist() if re.fullmatch(r"word/(?:document|header\d+|footer\d+)\.xml", name)]
            for part in story_parts:
                root = etree.fromstring(archive.read(part))
                for image in root.xpath(".//wp:docPr", namespaces=NS):
                    if not ((image.get("descr") or "").strip() or (image.get("title") or "").strip()):
                        report.add("docx.image-alt", path, f"Image in {part} is missing alternative text.")
                for table in root.xpath(".//w:tbl", namespaces=NS):
                    first_rows = table.xpath("./w:tr[1]", namespaces=NS)
                    if first_rows and not first_rows[0].xpath("./w:trPr/w:tblHeader", namespaces=NS):
                        report.add("docx.table-header", path, f"Table in {part} is missing a repeatable header row.")
            headings = document.xpath(".//w:pStyle[starts-with(@w:val, 'Heading')]", namespaces=NS)
            if not headings:
                report.add("docx.heading-structure", path, "Document has no semantic heading styles.")
        if "Manrope" not in source or "IBM Plex Mono" not in source:
            report.add("font.required", path, "The document must reference Manrope and IBM Plex Mono.")
        if VARIABLE.search(source) and not is_template(path):
            report.add("content.unresolved-variable", path, "Release document contains unresolved variables.")
    except (zipfile.BadZipFile, KeyError, etree.XMLSyntaxError) as error:
        report.add("docx.integrity", path, f"DOCX package is invalid: {error}")


def dereference(value):
    return value.get_object() if hasattr(value, "get_object") else value


def font_descriptor(font):
    font = dereference(font)
    descriptor = font.get("/FontDescriptor")
    if descriptor:
        return dereference(descriptor)
    descendants = font.get("/DescendantFonts")
    if descendants:
        return dereference(dereference(descendants)[0]).get("/FontDescriptor")
    return None


def inspect_pdf(path: Path, report: Report):
    try:
        reader = PdfReader(path)
        if not reader.pages:
            report.add("pdf.page-count", path, "PDF has no pages.")
            return
        all_text = []
        unembedded = set()
        for page in reader.pages:
            box = page.mediabox
            width, height = float(box.width), float(box.height)
            if width <= 0 or height <= 0:
                report.add("pdf.page-bounds", path, "PDF has an invalid page boundary.")
            all_text.append(page.extract_text() or "")
            resources = dereference(page.get("/Resources", {}))
            fonts = dereference(resources.get("/Font", {})) if resources else {}
            for reference in fonts.values() if hasattr(fonts, "values") else []:
                font = dereference(reference)
                descriptor = font_descriptor(font)
                descriptor = dereference(descriptor) if descriptor else None
                if descriptor and not any(descriptor.get(key) for key in ("/FontFile", "/FontFile2", "/FontFile3")):
                    unembedded.add(str(font.get("/BaseFont", "unknown")))
        text = "\n".join(all_text)
        if len(text.strip()) < 20:
            report.add("pdf.selectable-text", path, "PDF does not contain enough selectable text.")
        if VARIABLE.search(text) and not is_template(path):
            report.add("content.unresolved-variable", path, "Release PDF contains unresolved variables.")
        if unembedded:
            report.add("pdf.font-embedding", path, f"Fonts are not embedded: {', '.join(sorted(unembedded))}.")
        if "brand-starter" in path.name and len(reader.pages) != 6:
            report.add("pdf.page-count", path, f"Starter deck PDF should have six pages; found {len(reader.pages)}.")
    except Exception as error:
        report.add("pdf.integrity", path, f"PDF could not be inspected: {error}")


def inspect_social(path: Path, report: Report):
    expected = {
        "maslow-social-og-1200x630.png": (1200, 630),
        "maslow-social-square-1080x1080.png": (1080, 1080),
        "maslow-social-banner-1584x396.png": (1584, 396),
    }
    with Image.open(path) as image:
        if image.size != expected[path.name]:
            report.add("social.dimensions", path, f"Expected {expected[path.name]}; found {image.size}.")


def main():
    parser = ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parent.parent)
    parser.add_argument("--out", type=Path)
    args = parser.parse_args()
    root = args.root.resolve()
    report = Report(root)
    for path in sorted((root / "artifacts/pptx").glob("*.pptx")) + sorted((root / "artifacts/blind-build").glob("*.pptx")):
        inspect_pptx(path, report)
    for path in sorted((root / "artifacts/docx").glob("*.docx")) + sorted((root / "artifacts/blind-build").glob("*.docx")):
        inspect_docx(path, report)
    for directory in (root / "artifacts/pdf", root / "artifacts/blind-build/pdf"):
        for path in sorted(directory.glob("*.pdf")):
            inspect_pdf(path, report)
    for path in sorted((root / "artifacts/social").glob("*.png")):
        inspect_social(path, report)
    output = report.output()
    destination = args.out or root / "artifacts/validation/artifact-report.json"
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(output, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(output, indent=2))
    raise SystemExit(1 if output["blocking"] else 0)


if __name__ == "__main__":
    main()
