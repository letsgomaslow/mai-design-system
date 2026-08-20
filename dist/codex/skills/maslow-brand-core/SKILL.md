---
name: maslow-brand-core
description: Use when creating, editing, reviewing, or exporting any Maslow AI branded website, campaign, presentation, document, PDF, image, or interface.
---

# Maslow Brand Core

Apply the canonical Maslow contract before making design or copy decisions.

1. Read `../../src/brand-contract.md` completely.
2. Use `../../src/tokens.json` for exact values, `../../src/policies.json` for messaging and evidence rules, and `../../src/logo-assets.json` for the complete approved logo catalog.
3. Start recurring work from an approved template or generator. Do not restyle from memory.
4. Use only the seven immutable designer PNG masters in `../../assets/logos/`. Never redraw, recolor, trace, crop, trim, retype, or re-encode them.
5. Mark every claim as production, modeled, illustrative, or in preparation. Add provenance for production evidence.
6. Run `node scripts/validate.mjs --mode draft --input <file>` while working.
7. Run release validation before delivery. Fix every blocking violation.

## Shape semantics

- Keep actions, controls, cards, panels, and other structural surfaces square.
- Use a capsule only for a non-interactive taxonomy or content-classification label.
- A taxonomy capsule must be a plain text element with no link, button, click, focus, or pointer semantics.

## Quick reference

| Need | Required skill |
| --- | --- |
| Copy or campaign | `maslow-messaging-campaigns` |
| Website or UI | `maslow-web-interface` |
| PowerPoint | `maslow-presentations` |
| Word or PDF | `maslow-documents-pdf` |
| Social or imagery | `maslow-social-imagery` |
| Final audit | `maslow-brand-review` |
