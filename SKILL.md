---
name: maslow-brand-os
description: Use when creating, editing, reviewing, or exporting any Maslow AI branded website, presentation, document, PDF, campaign, social asset, image, or interface.
---

# Maslow Brand OS

Use this repository as the only Maslow brand authority.

1. Read `src/brand-contract.md` completely before making brand decisions. In Hermes, use `${HERMES_SKILL_DIR}/src/brand-contract.md`.
2. Read `src/tokens.json`, `src/policies.json`, and `src/logo-assets.json` for exact values and approved assets. In Hermes, use `${HERMES_SKILL_DIR}/src/...`.
3. Load only the focused skill that matches the task. In Hermes, load it by qualified name, such as `maslow-brand-os:maslow-web-interface`:
   - Messaging or campaigns: `skills/maslow-messaging-campaigns/SKILL.md`
   - Websites or interfaces: `skills/maslow-web-interface/SKILL.md`
   - Presentations: `skills/maslow-presentations/SKILL.md`
   - Word or PDF: `skills/maslow-documents-pdf/SKILL.md`
   - Social or imagery: `skills/maslow-social-imagery/SKILL.md`
   - Final review: `skills/maslow-brand-review/SKILL.md`
4. Start from an approved template or generator. Do not restyle from memory.
5. Use only immutable designer logo masters listed in `src/logo-assets.json`.
6. Run draft validation while working and release validation before delivery.

Do not search for another Maslow brand source. Legacy Maslow skill names are compatibility wrappers for this contract.
