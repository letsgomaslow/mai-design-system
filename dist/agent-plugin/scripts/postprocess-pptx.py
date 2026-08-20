#!/usr/bin/env python3
"""Apply native PowerPoint font and alt-text metadata after artifact-tool export."""

from argparse import ArgumentParser
from pathlib import Path
import re
import tempfile
import zipfile

from lxml import etree

A = "http://schemas.openxmlformats.org/drawingml/2006/main"
P = "http://schemas.openxmlformats.org/presentationml/2006/main"
NS = {"a": A, "p": P}
MONO_NAMES = re.compile(r"eyebrow|footer|source|label|contact|folio", re.I)


def set_latin(run_properties, typeface):
    latin = run_properties.find(f"{{{A}}}latin")
    if latin is None:
        latin = etree.SubElement(run_properties, f"{{{A}}}latin")
    latin.set("typeface", typeface)


def process_slide(data: bytes, slide_number: int) -> bytes:
    root = etree.fromstring(data)
    for shape in root.xpath(".//p:sp", namespaces=NS):
        names = shape.xpath("./p:nvSpPr/p:cNvPr/@name", namespaces=NS)
        typeface = "IBM Plex Mono" if names and MONO_NAMES.search(names[0]) else "Manrope"
        for run_properties in shape.xpath(".//a:defRPr | .//a:rPr | .//a:endParaRPr", namespaces=NS):
            set_latin(run_properties, typeface)
    for picture in root.xpath(".//p:pic", namespaces=NS):
        properties = picture.xpath("./p:nvPicPr/p:cNvPr", namespaces=NS)
        if properties:
            alt = "Maslow AI mark in white" if slide_number == 1 else "Maslow AI mark in navy"
            properties[0].set("name", "Maslow AI mark")
            properties[0].set("title", alt)
            properties[0].set("descr", alt)
    return etree.tostring(root, xml_declaration=True, encoding="UTF-8", standalone=True)


def process_theme(data: bytes) -> bytes:
    root = etree.fromstring(data)
    for latin in root.xpath(".//a:themeElements/a:fontScheme/a:majorFont/a:latin", namespaces=NS):
        latin.set("typeface", "Manrope")
    for latin in root.xpath(".//a:themeElements/a:fontScheme/a:minorFont/a:latin", namespaces=NS):
        latin.set("typeface", "Manrope")
    return etree.tostring(root, xml_declaration=True, encoding="UTF-8", standalone=True)


def postprocess(path: Path):
    with tempfile.NamedTemporaryFile(suffix=".pptx", delete=False) as temporary:
        output = Path(temporary.name)
    with zipfile.ZipFile(path, "r") as source, zipfile.ZipFile(output, "w", zipfile.ZIP_DEFLATED) as target:
        for info in source.infolist():
            data = source.read(info.filename)
            match = re.fullmatch(r"ppt/slides/slide(\d+)\.xml", info.filename)
            if match:
                data = process_slide(data, int(match.group(1)))
            elif info.filename == "ppt/theme/theme1.xml":
                data = process_theme(data)
            target.writestr(info, data)
    output.replace(path)


def main():
    parser = ArgumentParser()
    parser.add_argument("pptx", type=Path)
    args = parser.parse_args()
    postprocess(args.pptx.resolve())


if __name__ == "__main__":
    main()
