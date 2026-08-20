---
name: maslow-brand-review
description: Use when auditing or approving Maslow AI websites, campaigns, presentations, documents, PDFs, social assets, templates, or plugin distributions before release.
---

# Maslow Brand Review

**REQUIRED SUB-SKILL:** Use `maslow-brand-core` first.

1. Validate the artifact in draft mode and report warnings by rule, location, and repair.
2. Confirm every logo file matches a `src/logo-assets.json` hash and preserves the designer master canvas. Reject redrawn, recolored, traced, cropped, trimmed, retyped, converted, optimized, or re-encoded logos.
3. Confirm the primary position, US English, direct copy, evidence labels, claim provenance, and resolved variables.
4. Inspect the rendered output at its final size. Do not approve from source text alone.
5. Run release mode. Approve only when the report has zero blocking violations.

Use `src/schemas/validation-report.schema.json` for the report contract.
