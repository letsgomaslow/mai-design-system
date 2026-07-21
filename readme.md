# Maslow AI — Ascent Design Language (2026)

One system for the website, decks, documents, admin paper, and social. This project is the canonical Maslow design system: tokens, components, and forkable templates for every recurring asset type. Goal: repeatability and standardization — never restyle from memory; fork a template.

**Company context.** Maslow AI is an AI-transformation consultancy: strategy, technology, and design delivered as one roadmap ("deliberate, measurable, built to last"). Core offers: AI readiness assessment, agentic harness / context engineering, virtual AI employees, 90-day foundation engagements. Products represented here: the 2026 marketing website (this project's `*.dc.html` pages), client decks, documents (proposals, memos, invoices), and social assets.

**Sources.** Production Maslow brand skills (colors/type/components/logo/imagery/voice, verified March 2026) + the approved on-canvas spec `Maslow Design System 2026.dc.html` ("Ascent") + the live 2026 site redesign (separate project). No Figma or external codebase.

## Content fundamentals

- Voice: confident, plain-spoken, consultant-calm. Short declaratives ("Navy speaks, accents point"). No hype, no exclamation marks, no emoji.
- "We" for Maslow, "you/your team" for the client. Outcomes over features ("Ninety days later our team asks the AI before they ask each other").
- Headlines: sentence case, concrete, ≤9 words on social. Section titles often aphoristic pairs ("Where the value hides").
- Labels/eyebrows: UPPERCASE mono with wide tracking, mid-dot separators ("Q3 2026 · CLIENT NAME", "01 · PRINCIPLES").
- CTA links: `UPPERCASE TEXT  >` — two spaces before the chevron, deliberate.
- Numbers are unadorned and specific: "90 days", "93%", "1.33×".

## Visual foundations

- **Color:** navy carries authority (#192332 text/structure, #121D35 dark bands); four accents are wayfinding, never decoration. Pink = action only ("if it's pink, you can click it"): #DA85B2 links, #EE7BB3 buttons. Pillars: purple #A070A6 Strategy, teal #73C1AE Technology, orange #EBA93D Design. Yellow #FFF860 is a highlight/underline only, never a background. Body text #333333, never pure black.
- **Type:** Manrope for everything, 9 levels (60→9px, see `tokens/typography.css`). Display is 600-weight, tight (−1.4px). Metadata in DM Sans (Formular stand-in); micro-labels + logo "AI" in IBM Plex Mono (FoundersGroteskMono stand-in). Never Graphik/Nocturno.
- **Structure:** hairline-led. 1px rules: #192332 for structural top rules, #E1E1E1 between rows. Content max 1200px inside 1400px canvas, 96–128px section gaps, 12-col/24px grid, 16px card gutters.
- **Backgrounds:** flat white, off-white #F6F7F9 alternation, or full-bleed navy bands. No gradient washes; gradients exist only in the logo mark and case-study image masks.
- **Cards:** white, 1px #F1F1F1 border, 4px radius, offset "stacked-paper" shadow (17px 9px 5px rgba(0,0,0,.25)) — never centered shadows.
- **Radii:** small (2–8px); 17px pills; anything rounder is off-brand except avatars.
- **Motion:** rise-and-fade reveals, 0.7s cubic-bezier(.2,.7,.2,1), 22px translate; staggered ~100ms; respects reduced-motion. Hover = color shift (pink→hot-pink) or subtle opacity; focus = 2px teal outline, 2px offset.
- **Transparency/blur:** essentially none — ghost elements use low opacity (.14–.35) of solid brand colors instead.
- **Imagery:** photography cool and editorial; ghost gradient mark bleeding off-corner as social/dark-band garnish (opacity ~.14). Duotone masks (teal→pink) on case-study imagery.

## Iconography

No icon font. Iconography is typographic: mono numbers ("01"), mid-dots, chevrons (`>`), status dots (6px green #2CD552 / red #D52C2C), hairline rules, and the logo mark itself. Unicode chars over drawn glyphs. No emoji, ever. If a real icon set is unavoidable, use thin-stroke Lucide from CDN and flag it.

**Logo:** the mark (374×249 viewBox) in `assets/`: `maslow-mark-gradient.svg` (primary, digital), `maslow-mark-ink.svg` (on light), `maslow-mark-white.svg` (on dark), `maslow-mark-cream.svg` / `maslow-mark-ice.svg` (tinted variants). Gradient must use `gradientUnits="userSpaceOnUse"` spanning the full viewBox (#F377B3→#6DC4AD). Lockup: mark + "MASLOW" (Manrope 600, 2px tracking) + "| AI" (mono). Footer omits "| AI". Clear space = cap-height of "M"; min lockup width 120px. Never redraw, recolor, distort, or add effects.

## Index

- `styles.css` → `tokens/` (colors, typography, spacing, fonts)
- `guidelines/` — foundation specimen cards (Design System tab)
- `components/` — React primitives: `navigation/` (NavHeader, SiteFooter), `actions/` (CTAButton, CTALink), `badges/` (PillBadge, StatusBadge, CategoryTag, SectionEyebrow), `cards/` (CaseStudyCard, StatBlock, TestimonialBlock), `forms/` (FormInput, FormTextArea)
- `templates/deck-01-title/` … `templates/deck-06-closing/` — six 1920×1080 slide masters (title, section, content, stats, quote, closing), one template folder per master
- `templates/doc-proposal/`, `templates/doc-memo/`, `templates/doc-invoice/` — Letter documents
- `templates/social-og/`, `templates/social-square/`, `templates/social-banner/` — OG 1200×630, square 1080×1080, LinkedIn banner 1584×396
- `assets/` — logo mark variants; `assets/fonts/` — vendored webfonts
- `Maslow Design System 2026.dc.html` — the approved on-canvas Ascent spec (brand reference)
- `Template Gallery.html` — human-browsable index of all templates
- `mz-responsive.css` — responsive layer used by the spec page; `support.js` — DC runtime
- The full 2026 website built on this system lives in the separate Maslow website project (this project holds the system only)

## Intentional additions

- `SectionEyebrow` (mono numbered eyebrow) — core 2026 pattern used on every surface, formalized as a component.
- Deck/document/social templates — requested standardization targets, derived 1:1 from spec §11–12.

## Caveats

- Formular and FoundersGroteskMono are commercial and not bundled; DM Sans and IBM Plex Mono are the approved stand-ins (already reflected in tokens). Supply licensed files to upgrade.
- Fonts are vendored (OFL binaries in `assets/fonts/`): Manrope + DM Sans variable, IBM Plex Mono 400/500 — no network dependency.
