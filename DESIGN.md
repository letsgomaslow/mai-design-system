---
name: Maslow Brand OS
version: 1.1.0
canonical-tokens: src/tokens.json
canonical-policies: src/policies.json
canonical-contract: src/brand-contract.md
---

# Maslow Brand OS design reference

This file is a human-readable index. The JSON sources listed above are normative. When prose and source disagree, canonical source wins.

## Brand position

Primary external position: "AI employees for the work that waits on your busiest people."

"Transform with purpose" is supporting or legacy language. It must not replace the primary position on a new external asset.

## Visual contract

- Navy `#192332` is the default primary action on white or light surfaces, with white text.
- White is the inverse primary action on navy surfaces, with navy text.
- Pink `#EE7BB3` is a scarce signal. Use it for a small underline, dot, or exceptional emphasis, never a default button, card, badge, panel, or input fill.
- Links use accessible purple. Focus uses the darker accessible purple token.
- Structural radius is 0px for buttons, action links, cards, panels, inputs, navigation controls, interactive filters, interactive chips, and interactive badges.
- Non-interactive taxonomy and content-classification labels use `--radius-capsule`. They are text spans, not links, buttons, filters, or focus targets.
- Circles are reserved for avatars, status dots, step markers, and small signals whose shape carries meaning.
- Hierarchy comes from flat white, off-white, and navy surfaces, hairline rules, spacing, and typography.
- Logo color comes only from the supplied artwork. Never recreate or approximate its gradient from palette tokens. Other gradients are limited to restrained image treatment and never used as an interface background or text fill.

## Typography

- Manrope: body, headlines, labels, and UI.
- DM Sans: selected display or metadata use.
- IBM Plex Mono: eyebrows, folios, evidence status, and compact metadata.
- Use sentence case for headlines and body copy. Uppercase is reserved for compact labels and eyebrows.
- Use only approved vendored fonts. A platform-safe fallback may be used only when embedding is impossible and must be reported by validation.

## Components

```css
.action-primary {
  background: #192332;
  color: #FFFFFF;
  border-radius: 0;
}

.action-inverse {
  background: #FFFFFF;
  color: #192332;
  border-radius: 0;
}

.text-link {
  color: #9D4B8E;
}

:focus-visible {
  outline: 2px solid #401877;
  outline-offset: 2px;
}

.card,
.panel,
.input,
.interactive-badge {
  border-radius: 0;
}

[data-taxonomy-label] {
  border-radius: var(--radius-capsule);
  cursor: auto;
}
```

One clear primary action should appear early in the experience. Secondary actions may be outline or text treatments. A pink pseudo-element may signal interactivity without carrying readable text.

## Layout and imagery

- Use a 1400px maximum canvas and a 1200px maximum content width for web output.
- Use generous section spacing and 1px rules for structure.
- Use restrained editorial photography with useful human or workflow context.
- Avoid generic AI imagery, glowing brains, robots, dashboards without purpose, decorative stock photography, and visual claims that imply unverified outcomes.
- Use only the immutable designer masters cataloged in `src/logo-assets.json` and stored in `assets/logos/`. Preserve every file byte, aspect ratio, transparent canvas, and internal spacing.
- Never redraw, recolor, trace, crop, trim, retype, or re-encode a logo. Use a complete lockup when the Maslow AI name must be visible and a symbol-only master for favicons, avatars, or decorative identifiers.

## Messaging and evidence

Public work must:

1. Use US English and no em dashes.
2. Lead with the waiting workflow, owner, human decision, deliverable, and next action.
3. Avoid hype and self-certifying language.
4. Place one of `production`, `modeled`, `illustrative`, or `in_preparation` beside each material claim.
5. Provide provenance for production and modeled claims.
6. Keep diligence artifacts at IN PREPARATION until reviewed.
7. Use no more than one contrast construction such as "X, not Y" on a page.
8. Remove all unresolved variables before release.

## Artifact starters

- Slides: six editable layouts for title, section, content, evidence, quote, and closing.
- Documents: editable proposal, memo, and invoice templates built with Word styles.
- PDF: export from an approved PPTX, DOCX, or HTML source, then verify text selection, page bounds, fonts, and clipping.
- Social: 1200x630, 1080x1080, and 1584x396 deterministic templates driven by an `ArtifactBrief`.
- Web: consume package tokens and map existing site variables to those tokens. Do not create an independent palette.

## Validation

Draft mode warns while allowing iteration. Release mode blocks unresolved variables, unapproved colors or logos, pink structural fills, rounded structural surfaces, interactive capsules, inaccessible contrast, unsupported fonts, unlabeled claims, unverified metrics, and export defects.

Run `npm test`, `npm run build`, and release validation before distributing work.
