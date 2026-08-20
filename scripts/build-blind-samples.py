#!/usr/bin/env python3
"""Create filled blind-build fixtures from the editable native starters."""

from pathlib import Path
import json
import re
import shutil
import zipfile

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "artifacts" / "blind-build"

PPTX_VALUES = {
    "TITLE": "MASLOW WORKFLOW BRIEF",
    "SUBTITLE": "ILLUSTRATIVE BLIND-BUILD SAMPLE",
    "BODY": "Replace this layout placeholder when authoring a new slide.",
    "DATE": "WORKFLOW BRIEF",
    "AUDIENCE": "OPERATIONS LEADERS",
    "PRESENTER": "MASLOW AI",
    "ENGAGEMENT": "ILLUSTRATIVE WORKING SESSION",
    "SECTION_LABEL": "OWNERSHIP",
    "SECTION_TITLE": "Define the work and the decision",
    "SECTION_NUMBER": "01",
    "SLIDE_TITLE": "Workflow ownership and evidence",
    "WORKFLOW_ONE": "Intake and triage",
    "WORKFLOW_TWO": "Decision preparation",
    "WORKFLOW_THREE": "Delivery follow-up",
    "OWNER_ONE": "Operations",
    "OWNER_TWO": "Business lead",
    "OWNER_THREE": "Service owner",
    "DELIVERABLE_ONE": "a prioritized queue",
    "DELIVERABLE_TWO": "a decision-ready brief",
    "DELIVERABLE_THREE": "a completion receipt",
    "VALUE_1": "ASSIGNED",
    "VALUE_2": "REVIEW GATE",
    "VALUE_3": "RECEIPT",
    "CLAIM_1": "A named owner receives the waiting work.",
    "CLAIM_2": "A human keeps the consequential decision.",
    "CLAIM_3": "The workflow records its final deliverable.",
    "EVIDENCE_STATUS_ONE": "ILLUSTRATIVE",
    "EVIDENCE_STATUS_TWO": "ILLUSTRATIVE",
    "EVIDENCE_STATUS_THREE": "ILLUSTRATIVE",
    "SOURCE_ONE": "EXAMPLE ONLY",
    "SOURCE_TWO": "EXAMPLE ONLY",
    "SOURCE_THREE": "EXAMPLE ONLY",
    "VERIFIED_QUOTE": "An illustrative customer-voice pattern for layout testing only.",
    "ATTRIBUTION": "Illustrative, not a customer testimonial",
    "EVIDENCE_STATUS": "ILLUSTRATIVE",
    "SOURCE": "BRAND OS BLIND-BUILD FIXTURE",
    "NEXT_ACTION_HEADLINE": "Bring one waiting workflow",
    "CTA_LABEL": "BOOK A WORKING SESSION",
    "CONTACT": "MASLOW.AI",
    "FOLIO": "1.0.1",
}

DOCX_VALUES = {
    "DATE": "2026-08-19",
    "WAITING_WORKFLOW": "Intake and decision preparation",
    "AUDIENCE": "operations leaders",
    "OWNER": "Operations lead",
    "HUMAN_DECISION": "Approve the final recommendation",
    "DELIVERABLE": "Decision-ready workflow brief",
    "PHASE_1": "Define",
    "PHASE_1_OUTPUT": "Workflow, owner, and decision boundary",
    "PHASE_2": "Prepare",
    "PHASE_2_OUTPUT": "Evidence-backed draft deliverable",
    "PHASE_3": "Review",
    "PHASE_3_OUTPUT": "Approved deliverable and receipt",
    "EVIDENCE_STATUS": "ILLUSTRATIVE",
    "SOURCE": "Maslow Brand OS blind-build fixture",
    "CLAIM_OR_SCENARIO": "Example workflow structure for template and validation testing.",
    "CTA_LABEL": "BOOK A WORKING SESSION",
}


def replace_archive(source: Path, destination: Path, replacements: dict[str, str]):
    pattern = re.compile(r"\{\{([A-Z0-9_]+)\}\}")
    with zipfile.ZipFile(source, "r") as source_zip, zipfile.ZipFile(destination, "w", zipfile.ZIP_DEFLATED) as output_zip:
        for info in source_zip.infolist():
            data = source_zip.read(info.filename)
            if info.filename.endswith((".xml", ".rels")):
                text = data.decode("utf-8")
                text = pattern.sub(lambda match: replacements.get(match.group(1), match.group(0)), text)
                data = text.encode("utf-8")
            output_zip.writestr(info, data)


def unresolved(path: Path) -> list[str]:
    values = []
    with zipfile.ZipFile(path, "r") as archive:
        for name in archive.namelist():
            if name.endswith(".xml"):
                values.extend(re.findall(r"\{\{[A-Z0-9_]+\}\}", archive.read(name).decode("utf-8")))
    return sorted(set(values))


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    deck = OUTPUT / "maslow-workflow-brief.pptx"
    proposal = OUTPUT / "maslow-workflow-proposal.docx"
    replace_archive(ROOT / "artifacts/pptx/maslow-brand-starter.pptx", deck, PPTX_VALUES)
    replace_archive(ROOT / "artifacts/docx/maslow-proposal-template.docx", proposal, DOCX_VALUES)
    for path in (deck, proposal):
        remaining = unresolved(path)
        if remaining:
            raise RuntimeError(f"Unresolved variables in {path.name}: {remaining}")
    shutil.copy2(ROOT / "fixtures/blind-build/website-cta.html", OUTPUT / "website-cta.html")
    shutil.copy2(ROOT / "fixtures/blind-build/artifact-brief.json", OUTPUT / "artifact-brief.json")
    for path in (ROOT / "artifacts/social").glob("maslow-social-*.*"):
        shutil.copy2(path, OUTPUT / path.name)
    manifest = {
        "scenario": "Blind build using only packaged Brand OS resources",
        "outputs": sorted(path.name for path in OUTPUT.iterdir() if path.is_file()),
        "evidenceStatus": "illustrative",
        "source": "Maslow Brand OS blind-build fixture",
    }
    (OUTPUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
