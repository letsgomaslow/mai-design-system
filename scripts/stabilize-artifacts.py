#!/usr/bin/env python3
"""Normalize generated Office previews and preserve equivalent canonical PDFs."""

from argparse import ArgumentParser
from hashlib import sha256
from pathlib import Path, PurePosixPath
import json
import re
import shutil
import tempfile
import uuid
import zipfile

from lxml import etree
from pypdf import PdfReader


FIXED_ZIP_TIME = (2020, 1, 1, 0, 0, 0)
FIXED_W3CDTF = "2000-01-01T00:00:00Z"
UUID_NAMESPACE = uuid.UUID("dcac299d-f6b0-51ae-91d4-012a5a07dd6d")
UUID_RE = re.compile(r"\{?([0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12})\}?")
AID_RE = re.compile(r"\b(sl|sh|im|nt)/[a-z0-9]{6,12}\b")
ID_KEYS = {"id", "aid", "layoutId", "masterLayoutId", "parentLayoutId", "assetId"}
RELATIONSHIP_NS = "http://schemas.openxmlformats.org/package/2006/relationships"


def stable_uuid(seed: str) -> str:
    return str(uuid.uuid5(UUID_NAMESPACE, seed)).upper()


def relationship_owner(name: str) -> str | None:
    if name == "_rels/.rels":
        return None
    path = PurePosixPath(name)
    if path.parent.name != "_rels" or not path.name.endswith(".rels"):
        return None
    return str(path.parent.parent / path.name.removesuffix(".rels"))


def serialize_xml(root: etree._Element) -> bytes:
    return etree.tostring(root, xml_declaration=True, encoding="UTF-8", standalone=True)


def canonicalize_pptx_entries(entries: dict[str, bytes]) -> dict[str, bytes]:
    owner_mappings: dict[str, dict[str, str]] = {}
    for name in sorted(entry for entry in entries if entry.endswith(".rels")):
        root = etree.fromstring(entries[name])
        relationships = list(root)
        relationships.sort(key=lambda item: (
            item.get("Type", ""), item.get("Target", ""), item.get("TargetMode", ""),
        ))
        mapping = {}
        for index, relationship in enumerate(relationships, start=1):
            previous = relationship.get("Id", "")
            current = f"rId{index}"
            mapping[previous] = current
            relationship.set("Id", current)
        root[:] = relationships
        entries[name] = serialize_xml(root)
        owner = relationship_owner(name)
        if owner:
            owner_mappings[owner] = mapping

    for name in sorted(entry for entry in entries if entry.endswith((".xml", ".rels"))):
        root = etree.fromstring(entries[name])
        mapping = owner_mappings.get(name, {})
        creation_index = 0
        for element in root.iter():
            for attribute, value in list(element.attrib.items()):
                if value in mapping:
                    element.set(attribute, mapping[value])
            if etree.QName(element).localname == "creationId":
                creation_index += 1
                if "id" in element.attrib:
                    element.set("id", "{" + stable_uuid(f"{name}:creation:{creation_index}") + "}")
                if "val" in element.attrib:
                    value = int.from_bytes(
                        sha256(f"{name}:creation:{creation_index}".encode()).digest()[:4], "big",
                    ) & 0x7FFFFFFF
                    element.set("val", str(value or 1))
            if name == "docProps/core.xml" and etree.QName(element).localname in {"created", "modified"}:
                element.text = FIXED_W3CDTF
        entries[name] = serialize_xml(root)
    return entries


def deterministic_zip_info(name: str, compression: int) -> zipfile.ZipInfo:
    info = zipfile.ZipInfo(name, FIXED_ZIP_TIME)
    info.compress_type = compression
    info.create_system = 3
    info.external_attr = 0o100644 << 16
    return info


def normalize_office(path: Path) -> None:
    with zipfile.ZipFile(path, "r") as source:
        source_info = {item.filename: item for item in source.infolist() if not item.is_dir()}
        entries = {name: source.read(name) for name in source_info}
    if path.suffix.lower() == ".pptx":
        entries = canonicalize_pptx_entries(entries)
    with tempfile.NamedTemporaryFile(suffix=path.suffix, delete=False) as temporary:
        output = Path(temporary.name)
    with zipfile.ZipFile(output, "w") as target:
        for name in sorted(entries):
            compression = source_info[name].compress_type
            target.writestr(deterministic_zip_info(name, compression), entries[name], compresslevel=9)
    output.replace(path)


class JsonIdCanonicalizer:
    def __init__(self) -> None:
        self.uuid_values: dict[str, str] = {}
        self.aid_values: dict[str, str] = {}
        self.id_values: dict[str, str] = {}

    def replace_uuid(self, match: re.Match[str]) -> str:
        source = match.group(0)
        raw = match.group(1).upper()
        replacement = self.uuid_values.setdefault(raw, stable_uuid(f"preview-uuid:{len(self.uuid_values) + 1}"))
        return "{" + replacement + "}" if source.startswith("{") else replacement

    def replace_aid(self, match: re.Match[str]) -> str:
        source = match.group(0)
        prefix = match.group(1)
        return self.aid_values.setdefault(source, f"{prefix}/{len(self.aid_values) + 1:08d}")

    def transform(self, value, key: str | None = None):
        if isinstance(value, dict):
            return {item_key: self.transform(item_value, item_key) for item_key, item_value in value.items()}
        if isinstance(value, list):
            return [self.transform(item) for item in value]
        if not isinstance(value, str):
            return value
        original = value
        value = UUID_RE.sub(self.replace_uuid, value)
        value = AID_RE.sub(self.replace_aid, value)
        is_uuid = UUID_RE.fullmatch(original) is not None
        is_aid = AID_RE.fullmatch(original) is not None
        if key in ID_KEYS and original and not is_uuid and not is_aid:
            value = self.id_values.setdefault(original, f"id-{len(self.id_values) + 1:08d}")
        return value


def normalize_previews(preview_root: Path) -> None:
    canonicalizer = JsonIdCanonicalizer()
    for path in sorted(preview_root.glob("*.layout.json")):
        payload = canonicalizer.transform(json.loads(path.read_text(encoding="utf-8")))
        path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    for path in sorted(preview_root.glob("*.inspect.ndjson")):
        lines = []
        for line in path.read_text(encoding="utf-8").splitlines():
            if line.strip():
                lines.append(json.dumps(canonicalizer.transform(json.loads(line)), ensure_ascii=False, separators=(",", ":")))
        path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def directory_hashes(path: Path) -> dict[str, str]:
    if not path.exists():
        return {}
    return {
        str(item.relative_to(path)): sha256(item.read_bytes()).hexdigest()
        for item in sorted(path.rglob("*")) if item.is_file()
    }


def pdf_text(path: Path) -> tuple[tuple[float, float, str], ...]:
    reader = PdfReader(path)
    return tuple(
        (float(page.mediabox.width), float(page.mediabox.height), page.extract_text() or "")
        for page in reader.pages
    )


def preview_path(artifacts: Path, pdf: Path) -> Path:
    relative = pdf.relative_to(artifacts)
    if relative.parts[:2] == ("blind-build", "pdf"):
        return artifacts / "previews" / "pdf" / "blind-build" / pdf.stem
    return artifacts / "previews" / "pdf" / pdf.stem


def preserve_equivalent_pdfs(previous: Path, current: Path) -> int:
    preserved = 0
    for pdf in sorted((current / "pdf").glob("*.pdf")) + sorted((current / "blind-build" / "pdf").glob("*.pdf")):
        old_pdf = previous / pdf.relative_to(current)
        if not old_pdf.exists():
            continue
        same_text = pdf_text(pdf) == pdf_text(old_pdf)
        same_pages = directory_hashes(preview_path(current, pdf)) == directory_hashes(preview_path(previous, old_pdf))
        if same_text and same_pages:
            shutil.copyfile(old_pdf, pdf)
            preserved += 1
    return preserved


def main() -> None:
    parser = ArgumentParser()
    parser.add_argument("--root", type=Path, required=True)
    parser.add_argument("--phase", choices=("office", "pdf"), required=True)
    parser.add_argument("--previous", type=Path)
    args = parser.parse_args()
    artifacts = args.root.resolve() / "artifacts"
    if args.phase == "office":
        office_files = sorted((artifacts / "pptx").glob("*.pptx"))
        office_files += sorted((artifacts / "docx").glob("*.docx"))
        office_files += sorted((artifacts / "blind-build").glob("*.pptx"))
        office_files += sorted((artifacts / "blind-build").glob("*.docx"))
        for path in office_files:
            normalize_office(path)
        normalize_previews(artifacts / "previews" / "pptx")
        print(json.dumps({"normalizedOfficeFiles": len(office_files)}))
        return
    if args.previous is None:
        parser.error("--previous is required for the pdf phase")
    preserved = preserve_equivalent_pdfs(args.previous.resolve(), artifacts)
    print(json.dumps({"preservedEquivalentPdfs": preserved}))


if __name__ == "__main__":
    main()
