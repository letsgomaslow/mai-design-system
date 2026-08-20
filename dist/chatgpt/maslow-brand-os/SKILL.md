---
name: maslow-brand-os
description: Use when creating or reviewing any Maslow AI branded website, presentation, document, PDF, campaign, social asset, image, or interface.
---

# Maslow Brand OS 1.1.0

Apply this compact contract before every task. Do not search for a different brand authority.

## Exact action and shape rules

- Primary action: #192332 with #FFFFFF text.
- Inverse action: #FFFFFF with #192332 text on dark surfaces.
- Link: #9D4B8E; hover: #654C8F; focus: #401877.
- Pink #EE7BB3 is a small signal only, never a default element fill or readable text.
- Structural radius: 0px. Non-interactive taxonomy labels use 9999px. Circles are limited to avatars, status dots, step markers, and meaningful small signals.

# Maslow Brand Contract 1.1.0

Apply this contract to every Maslow website, presentation, document, PDF, campaign, and social asset.

## Mandatory visual rules

1. Use navy for primary actions on light surfaces and white for inverse actions on dark surfaces.
   - Primary: navy `#192332` with white `#FFFFFF` text.
   - Inverse: white `#FFFFFF` with navy `#192332` text.
   - Text links: purple `#9D4B8E`; hover `#654C8F`; focus `#401877`.
2. Reserve pink for a small interaction signal or exceptional emphasis. Never use pink as a default element fill.
3. Use square actions and structural surfaces. Buttons, action links, cards, panels, inputs, navigation controls, interactive filters, interactive chips, and interactive badges use zero radius.
4. Use the capsule radius only for non-interactive taxonomy or content-classification labels. Render these labels as text-level elements, normally `span`, with no link, button, click, focus, or pointer semantics.
5. Preserve circles only for avatars, status dots, step markers, and small signals whose shape carries meaning.
6. Use Manrope for general copy, DM Sans for selected display emphasis, and IBM Plex Mono for compact metadata.
7. Use the seven immutable designer-supplied PNG masters cataloged in `src/logo-assets.json`. Never redraw, recolor, trace, crop, trim, retype, re-encode, or approximate a logo gradient from tokens.
8. Use flat white, off-white, or navy surfaces, hairline rules, generous spacing, and restrained accents.
9. Keep animation optional, brief, and disabled by reduced-motion preferences.

## Mandatory messaging rules

1. Lead external work with: "AI employees for the work that waits on your busiest people."
2. Lead with the waiting workflow, responsible owner, human decision, evidence status, and next action.
3. Use US English, direct sentences, and buyer-facing outcomes before technical detail.
4. Do not use em dashes, hype, fabricated metrics, placeholder testimonials, or unsupported client outcomes.
5. Use at most one contrast construction such as "X, not Y" in public material.
6. Label production evidence, modeled outcomes, illustrative scenarios, and in-preparation artifacts beside each claim. Production and modeled claims require a source or provenance reference.
7. Keep diligence artifacts at IN PREPARATION until reviewed.
8. Put one clear primary action early enough that technical exploration is never required to act.

## Release rule

Run the Brand OS validator in draft mode while iterating. Run release mode before delivery. Release mode must report zero blocking violations and no unresolved variables. A rounded interactive element or an interactive taxonomy capsule is always blocking.


## Task instructions

# Maslow Messaging and Campaigns

**REQUIRED SUB-SKILL:** Use `maslow-brand-core` first.

1. Lead with the waiting workflow and the person responsible for it.
2. State the human decision, evidence status, and next action near the claim they qualify.
3. Use the primary AI-employee position for external material. Use the legacy tagline only as support.
4. Write in US English with short, concrete sentences. Avoid hype, em dashes, self-certifying language, and unsupported certainty.
5. Use no more than one contrast construction in public material.
6. Build campaigns from one message brief, then adapt copy to each channel without changing the claim or evidence status.

Read `../../src/policies.json` for channel-neutral policy and `../../src/schemas/artifact-brief.schema.json` for required campaign inputs.

# Maslow Web and Interface

**REQUIRED SUB-SKILL:** Use `maslow-brand-core` first.

1. Import generated Brand OS tokens and preserve semantic action aliases.
2. Use navy primary actions, white inverse actions, square interactive and structural surfaces, and sparse pink signals.
3. Use capsules only for non-interactive taxonomy or content-classification spans. Never make a capsule a link, button, filter, click target, or keyboard focus target.
4. Lead buyer routes with workflow, owner, human decision, evidence status, and an early working-session action.
5. Keep technical maps secondary and optional.
6. Use semantic HTML, visible labels, one `h1`, a skip link, visible focus, keyboard-complete navigation, and reduced-motion fallbacks.
7. Test at 320, 768, 1024, and 1440 pixels, plus WCAG text spacing and reduced motion.

Use the existing website component patterns only after confirming they comply with the current contract.

# Maslow Presentations

**REQUIRED SUB-SKILL:** Use `maslow-brand-core` first.

1. Start from `artifacts/pptx/maslow-brand-starter.pptx` or the deterministic builder.
2. Use the six layouts: title, section, content, evidence, quote, and closing.
3. Keep titles concise, use one communication job per slide, and preserve editable text and shapes.
4. Label sample data and illustrative patterns on the slide. Put source provenance in speaker notes for production claims.
5. Use navy and white for authority, accents for wayfinding, and pink only as a small signal.
6. Render every slide, inspect at full size, and fix overflow, overlap, wrapping, or unresolved variables before release.

# Maslow Documents and PDF

**REQUIRED SUB-SKILL:** Use `maslow-brand-core` first.

1. Start from the matching DOCX template or deterministic builder.
2. Use real Word styles, headings, lists, tables, headers, footers, and alt text. Preserve editability.
3. Use explicit variables for unknown facts. Drafts may warn; release exports must resolve every variable.
4. Keep evidence labels beside quantitative or outcome claims. Production claims require provenance.
5. Export PDF from the verified source document. Confirm selectable text, page bounds, font rendering, and no clipping.
6. Render every DOCX and PDF page to images and inspect each page before delivery.

# Maslow Social and Imagery

**REQUIRED SUB-SKILL:** Use `maslow-brand-core` first.

1. Start from the approved OG, square, or banner template.
2. Use one message, one audience, one CTA, and one evidence status across a campaign set.
3. Prefer capable people doing real work, natural light, editorial environments, and technology in context.
4. Avoid generic AI stock, robot handshakes, floating brains, glossy AI renders, and decorative gradient washes.
5. Use approved logo assets, navy fields, restrained accents, and readable contrast.
6. Export deterministic SVG and PNG files at the exact target dimensions and run release validation.

# Maslow Brand Review

**REQUIRED SUB-SKILL:** Use `maslow-brand-core` first.

1. Validate the artifact in draft mode and report warnings by rule, location, and repair.
2. Confirm every logo file matches a `src/logo-assets.json` hash and preserves the designer master canvas. Reject redrawn, recolored, traced, cropped, trimmed, retyped, converted, optimized, or re-encoded logos.
3. Confirm the primary position, US English, direct copy, evidence labels, claim provenance, and resolved variables.
4. Inspect the rendered output at its final size. Do not approve from source text alone.
5. Confirm capsules are non-interactive taxonomy spans and every action, control, card, panel, and input remains square.
6. Run release mode. Approve only when the report has zero blocking violations.

Use `src/schemas/validation-report.schema.json` for the report contract.

## Included resources

Use `src/tokens.json`, `src/policies.json`, `src/schemas/`, `templates/`, `assets/`, and `scripts/validate.mjs`. Run release validation before delivery.
