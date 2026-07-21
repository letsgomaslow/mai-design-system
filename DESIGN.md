---
version: alpha
name: Maslow AI — Ascent
description: Design language for Maslow AI, an AI-transformation consultancy. One system for web UI, decks (1920×1080), documents (Letter), and social canvases. Navy speaks, accents point, pink means click.
colors:
  primary: "#192332"
  primary-band: "#121D35"
  action: "#EE7BB3"
  action-link: "#DA85B2"
  accent-teal: "#73C1AE"
  accent-orange: "#EBA93D"
  accent-purple: "#A070A6"
  label-purple: "#654C8F"
  highlight-yellow: "#FFF860"
  gradient-pink: "#F377B3"
  gradient-teal: "#6DC4AD"
  duotone-teal: "#86E8CE"
  duotone-pink: "#E686B5"
  surface: "#FFFFFF"
  surface-alt: "#F6F7F9"
  border-card: "#F1F1F1"
  border-hairline: "#E1E1E1"
  border-nav: "#E6EAF3"
  text-body: "#333333"
  text-secondary: "#666666"
  text-meta: "#A5A5A5"
  text-near-black: "#1A1A1A"
  status-open: "#2CD552"
  status-closed: "#D52C2C"
  dark-surface: "#1A2847"
  dark-surface-alt: "#243356"
  dark-border: "#3A4A6B"
  dark-text-secondary: "#B8C4D9"
  focus: "#73C1AE"
typography:
  display:
    fontFamily: Manrope
    fontSize: 60px
    fontWeight: 600
    lineHeight: 62px
    letterSpacing: -1.4px
  title:
    fontFamily: Manrope
    fontSize: 38px
    fontWeight: 400
    lineHeight: 42px
    letterSpacing: -0.89px
  heading:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: 500
    lineHeight: 40px
    letterSpacing: 0.64px
  card-heading:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: 700
    lineHeight: 26px
    letterSpacing: -0.57px
  lead:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: 400
    lineHeight: 30px
    letterSpacing: -0.2px
  body:
    fontFamily: Manrope
    fontSize: 17px
    fontWeight: 400
    lineHeight: 27px
    letterSpacing: 0.28px
  body-sm:
    fontFamily: Manrope
    fontSize: 15px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0px
  label:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: 600
    lineHeight: 16px
    letterSpacing: 0.4px
  micro-cta:
    fontFamily: Manrope
    fontSize: 9px
    fontWeight: 700
    lineHeight: 13px
    letterSpacing: 2px
  eyebrow:
    fontFamily: IBM Plex Mono
    fontSize: 11px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 3px
  meta:
    fontFamily: DM Sans
    fontSize: 13px
    fontWeight: 400
    lineHeight: 20px
  deck-eyebrow:
    fontFamily: IBM Plex Mono
    fontSize: 20px
    fontWeight: 500
    lineHeight: 28px
    letterSpacing: 5px
  deck-headline:
    fontFamily: Manrope
    fontSize: 64px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -1.6px
  deck-subhead:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.6px
  deck-body:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: 400
    lineHeight: 40px
  doc-body:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 400
    lineHeight: 23px
rounded:
  xs: 2px
  sm: 4px
  md: 8px
  pill: 17px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  section: 96px
  section-max: 128px
  card-gutter: 16px
  grid-gutter: 24px
  grid-columns: 12
  content-max: 1200px
  canvas-max: 1400px
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: 42px
    padding: 0 18px
  button-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: 42px
    padding: 0 18px
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: 42px
    padding: 0 18px
  link-cta:
    textColor: "{colors.action-link}"
    typography: "{typography.micro-cta}"
  link-cta-hover:
    textColor: "{colors.action}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-body}"
    borderColor: "{colors.border-card}"
    rounded: "{rounded.sm}"
    padding: 32px
  badge-pill:
    backgroundColor: "{colors.accent-purple}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: 34px
    padding: 0 18px
  section-eyebrow:
    textColor: "{colors.label-purple}"
    typography: "{typography.eyebrow}"
  input:
    backgroundColor: transparent
    textColor: "{colors.text-body}"
    typography: "{typography.body-sm}"
    borderBottomColor: "{colors.border-hairline}"
    height: 40px
  input-focus:
    borderBottomColor: "{colors.focus}"
  nav-header:
    backgroundColor: "{colors.surface}"
    borderBottomColor: "{colors.border-nav}"
    height: 83px
  stat-band:
    backgroundColor: "{colors.primary-band}"
    textColor: "{colors.surface}"
  site-footer:
    backgroundColor: "{colors.primary-band}"
    textColor: "{colors.surface}"
  status-dot-open:
    backgroundColor: "{colors.status-open}"
    size: 6px
  folio:
    textColor: "{colors.text-meta}"
    typography: "{typography.eyebrow}"
---

# Maslow AI — Ascent Design Language

Tokens above are normative: use ONLY those values. Prose below tells you where each one goes. When a rule and your instinct disagree, the rule wins. If something isn't specified, choose the quietest option that fits the system — never invent new colors, fonts, radii, or shadows.

## Overview

Maslow AI is an AI-transformation consultancy (strategy + technology + design, delivered as one roadmap). The design language, "Ascent," must read as **consultant-calm: confident, editorial, engineered**. Think premium printed report, not SaaS landing page: flat surfaces, hairline rules, generous whitespace, one deliberate pink action.

Personality anchors:
- **Navy speaks, accents point.** Dark navy (#192332) carries all authority — headings, structure, dark bands. The four accents are wayfinding, never decoration.
- **If it's pink, you can click it.** Pink appears ONLY on interactive elements, and ideally once per view.
- **Hairline-led.** Structure comes from 1px rules and typography, not boxes, tints, or shadows.
- **Dense with meaning, sparse with ink.** No filler stats, no decorative icons, no emoji, no exclamation marks.

Audience: executives and operators evaluating AI transformation. The UI should feel like advice worth paying for — measured, specific, built to last.

### Cardinal rules (read first, weak models memorize these)

1. Fonts: **Manrope** for everything; **IBM Plex Mono** for micro-labels/eyebrows/folios; **DM Sans** for metadata. Nothing else — never Inter, Roboto, Arial, Graphik, Nocturno.
2. Colors: only the hex values in the front matter. Opacity variants of those hexes are allowed (ghost elements at 0.14–0.35). Never #000000.
3. Text on white: headings #192332, body #333333, secondary #666666. Accents never carry body text.
4. Backgrounds: white, #F6F7F9, or navy #121D35. **Never gradients, never yellow, never pink.**
5. Shadows: either none, or the exact stacked-paper offset `17px 9px 5px rgba(0,0,0,0.25)`. Never centered soft shadows.
6. Radii: 2/4/8px; 17px pills; 9999px only for avatars and 6px status dots.
7. Every section opens with a mono uppercase eyebrow: `01 · SECTION NAME`.

## Colors

Whitelist palette. Roles:

- **Primary (#192332) — dark navy.** Headings, structural top rules, dark buttons, the wordmark. This is the brand's voice.
- **Band navy (#121D35).** Full-bleed dark section backgrounds (stat bands, footers, social canvases). On it: white headings, #B8C4D9 secondary text, teal eyebrows.
- **Action pink pair.** #DA85B2 for text links, #EE7BB3 for buttons and link hover. Pink = clickable, nothing else. One primary pink action per view.
- **Pillar accents:** purple #A070A6 = Strategy, teal #73C1AE = Technology, orange #EBA93D = Design. Used for pill badges, numerals, category tags — always paired with white text on the pill, never as body text or backgrounds of large areas.
- **Label purple (#654C8F).** Default eyebrow/mono-label color on light backgrounds (teal #73C1AE on navy).
- **Highlight yellow (#FFF860).** Marker-underline or text highlight ONLY. Never a background, never text.
- **Neutrals:** page white; alternate band #F6F7F9; card border #F1F1F1; row hairline #E1E1E1; nav border #E6EAF3; body #333333; secondary #666666; metadata #A5A5A5; near-black #1A1A1A for card titles.
- **Status:** 6px dots — open/live #2CD552, closed #D52C2C.
- **Dark-surface neutrals** (cards on navy): #1A2847 surface, #243356 raised, #3A4A6B border, #B8C4D9 secondary text.
- **Gradient (#F377B3 → #6DC4AD)** exists in exactly two places: the logo mark, and the duotone image mask (#86E8CE → #E686B5) over case-study imagery. Never as a background wash, button, or text fill.
- Focus ring: 2px solid #73C1AE, offset 2px.

Contrast note: white-on-hot-pink buttons are brand-correct despite failing WCAG AA for small text — labels are 12px/600 uppercase with 2px tracking. Do NOT "fix" this by darkening the pink. Long-form text always sits navy/#333 on white or white on navy (both pass AAA).

## Typography

Manrope carries the entire voice. DM Sans (stand-in for Formular) is metadata-only. IBM Plex Mono (stand-in for FoundersGroteskMono) does micro-labels, eyebrows, folios, and the "AI" in the logo lockup. Load fonts per the Assets section.

Web scale (9 levels + eyebrow — exact values in front matter):
- `display` 600 60px/62px −1.4px — hero statements
- `title` 400 38px/42px −0.89px — section titles (note the LIGHT weight — this is distinctive)
- `heading` 500 32px/40px — content headings
- `card-heading` 700 24px/26px −0.57px — card titles, color #1A1A1A
- `lead` 400 18px/30px — intro paragraphs
- `body` 400 17px/27px / `body-sm` 400 15px/24px
- `label` 600 12px, +0.4px, UPPERCASE — nav links, buttons, pills
- `micro-cta` 700 9px, +2px, UPPERCASE — text CTAs
- `eyebrow` IBM Plex Mono 500 11px, +3px, UPPERCASE

Casing rules: headlines and body are **sentence case** — never Title Case, never all-caps headlines. ALL-CAPS is reserved for mono eyebrows, labels, buttons, and CTAs. Eyebrows number their sections with mid-dots: `02 · WHAT WE DO`, `Q3 2026 · CLIENT NAME`.

CTA link format is exact: uppercase micro-cta pink text, two non-breaking spaces, then a `>` chevron: `READ THE CASE STUDY&nbsp;&nbsp;>`. Never bold-underlined links, never arrows (→).

Numbers are unadorned and specific: "90 days", "93%", "1.33×" — set big in Manrope 600, never decorated with icons.

## Layout

- Canvas max 1400px; content max 1200px; long-form text column max 1002px.
- 12-column grid, 24px gutters; card grids use 16px gutters.
- Vertical rhythm: 96–128px between sections; 4/8/12/16/24/32/48px inside components.
- Background rhythm: sections alternate flat white → #F6F7F9 → occasional full-bleed navy #121D35 band. Max 2 background colors visible per viewport.
- **Hairline structure:** content blocks open with a 1.5–2px solid #192332 top rule; rows inside separate with 1px #E1E1E1. Tables, lists, memo headers, deck content rows all use this pattern. Boxes and tint-panels are NOT the Maslow way — rules and whitespace are.
- Nav header: 83px tall, white, 1px #E6EAF3 bottom border, lockup left, 3–5 uppercase links right (active link pink #DA85B2).

## Elevation & Depth

The system is flat. Hierarchy comes from tonal contrast (white / #F6F7F9 / navy), hairlines, and type weight — not shadows.

Exactly one shadow exists: the **stacked-paper offset shadow** on white cards:
`box-shadow: 17px 9px 5px rgba(0,0,0,0.25)` (featured cards: `17px 11px 5px rgba(0,0,0,0.75)`).
It offsets right and down like stacked prints. NEVER a centered ambient shadow (`0 4px 12px …`), never glows, never blur/glassmorphism. Ghost depth on dark surfaces = the gradient logo mark at opacity 0.14 bleeding off a corner.

## Shapes

Architectural, near-sharp. Corner radii: 2px (small chips), 4px (cards, inputs when boxed), 8px (buttons). Pills are exactly 17px radius, 34px tall. Anything rounder is off-brand except circular avatars and 6px status dots. No organic blobs, no clipped waves, no rotated elements.

## Components

Copy these recipes verbatim (CSS custom properties defined in the CSS Variables section below).

**Buttons** — 42px tall, uppercase label, 8px radius:
```css
.btn{height:42px;display:inline-flex;align-items:center;padding:0 18px;border-radius:8px;font:600 12px "Manrope",sans-serif;letter-spacing:2px;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer}
.btn-primary{background:#EE7BB3;color:#fff}      /* THE action — one per view */
.btn-dark{background:#192332;color:#fff}         /* secondary */
.btn-ghost{background:transparent;color:#192332;box-shadow:inset 0 0 0 1px #192332}
```

**Text CTA link:**
```css
.cta{font:700 9px "Manrope",sans-serif;letter-spacing:2px;text-transform:uppercase;color:#DA85B2;text-decoration:none}
.cta:hover{color:#EE7BB3}
/* markup: <a class="cta">READ THE CASE STUDY&nbsp;&nbsp;&gt;</a> */
```

**Stacked-paper card** (signature element):
```css
.card{background:#fff;border:1px solid #F1F1F1;border-radius:4px;box-shadow:17px 9px 5px rgba(0,0,0,.25);padding:32px}
.card h3{font:700 24px/26px "Manrope",sans-serif;letter-spacing:-.57px;color:#1A1A1A;margin:24px 0 12px}
.card p{font:400 15px/24px "Manrope",sans-serif;color:#666}
```
Card anatomy: pill badge top-left → title → blurb → pink CTA pinned to bottom (`margin-top:auto`).

**Pill badge** (34px, pillar-colored, white text):
```css
.pill{height:34px;display:inline-flex;align-items:center;padding:0 18px;border-radius:17px;font:600 12px "Manrope",sans-serif;letter-spacing:2px;text-transform:uppercase;color:#fff;background:#A070A6}
```

**Section eyebrow** (opens EVERY section on every surface):
```css
.eyebrow{font:500 11px "IBM Plex Mono",monospace;letter-spacing:3px;text-transform:uppercase;color:#654C8F}
/* markup: <div class="eyebrow">02 · SERVICES</div> — teal #73C1AE on navy */
```

**Form input** — hairline underline, no box:
```css
.field label{font:600 12px "Manrope",sans-serif;letter-spacing:.4px;text-transform:uppercase;color:#192332}
.field input,.field textarea{height:40px;border:none;border-bottom:1px solid #E1E1E1;background:transparent;font:400 15px "Manrope",sans-serif;color:#333;outline:none;padding:0}
.field input:focus{border-bottom-color:#73C1AE}
```
Contact forms: two-column fields, full-width message, one pink submit.

**Status dot:** 6px circle, #2CD552 open / #D52C2C closed, next to 12px label.

**Stat band:** full-bleed #121D35; numbers Manrope 600 48–64px white; labels 12px uppercase #B8C4D9; hairline #3A4A6B between items. Numbers stay unadorned.

**Testimonial:** large Manrope 400 quote in navy, attribution as mono eyebrow: `COO · MANUFACTURING CLIENT`. Quotes speak outcomes, not praise.

## Do's and Don'ts

Do:
- Use only front-matter hex values; opacity variants (rgba of listed colors, 0.14–0.35 for ghosts) are the only derivations allowed.
- One pink action per view; everything else navy/ghost.
- Open every section with a numbered mono eyebrow.
- Sentence-case headlines ≤9 words; concrete, no hype.
- Structural 2px navy top rule + 1px #E1E1E1 row hairlines for all tabular/list content.
- Copy the exact shadow, radii, and type values — they are deliberate.

Don't:
- Never #000000 text or backgrounds; body text is #333333.
- Never gradient backgrounds or gradient text (gradient = logo mark + image duotones only).
- Never yellow (#FFF860) as background — highlight/underline only.
- Never centered/ambient shadows, glows, blur, or glassmorphism.
- Never emoji, icon fonts, or hand-drawn SVG icons. Iconography is typographic (see below).
- Never fonts outside Manrope / IBM Plex Mono / DM Sans.
- Never radius > 17px (except avatars/dots); never rotated or blob shapes.
- Never darken the pink "for accessibility"; never set body copy in accent colors.
- Never exclamation marks, Title Case Headlines, or ALL-CAPS sentences.
- Never restyle from memory — fork the matching template in `templates/` when available.

## Iconography

There is no icon set. Iconography is typographic:
- Mono numerals `01 02 03` (teal or pillar-colored) for steps and lists
- Mid-dot `·` separators, chevron `>` for CTAs
- 6px status dots, 1px hairline rules, and the logo mark itself
- Unicode characters over drawn glyphs, always
If an icon set is truly unavoidable (app UI), use thin-stroke Lucide via CDN, 1.5px stroke, #192332, 16–20px — and flag it for design review. No emoji, ever.

## Logo

Files in `assets/`: `maslow-mark-gradient.svg` (primary, digital), `maslow-mark-ink.svg` (on light), `maslow-mark-white.svg` (on dark), plus cream/ice tints. Mark viewBox is 374×249 (aspect ≈ 1.5:1).

- Lockup: mark (36×23px in nav) + `MASLOW` Manrope 600 13px +2px tracking + light `|` in #A5A5A5 + `AI` IBM Plex Mono 500 10px +3px. Footer lockup intentionally drops "| AI".
- Clear space = cap-height of the M; minimum lockup width 120px.
- Gradient mark must keep `gradientUnits="userSpaceOnUse"` spanning #F377B3 → #6DC4AD.
- **Never** redraw, recolor, distort, outline, or add effects to the mark. If the SVG files are unavailable, use the text lockup alone — do not attempt to draw the mark.
- Ghost usage: gradient mark, opacity 0.14, oversized (35–40% of canvas width), bleeding off a corner of navy surfaces.

## Motion

- Reveal pattern: rise-and-fade — `opacity 0→1`, `translateY(22px)→0`, `0.7s cubic-bezier(.2,.7,.2,1)`, staggered ~100ms per sibling.
- Hover: color shift (link pink → hot pink) or opacity nudge; never scale-ups, bounces, or springs.
- Focus: `outline:2px solid #73C1AE; outline-offset:2px`.
- Always wrap animation in `@media (prefers-reduced-motion: reduce){ … }` to disable.
- Video/animated assets follow the same easing and restraint: cuts and fades, no whip-pans, no kinetic typography beyond rise-and-fade.

## Voice & Copy

- Confident, plain-spoken, consultant-calm. Short declaratives. No hype, no exclamation marks, no emoji.
- "We" = Maslow; "you / your team" = the client. Outcomes over features: "Ninety days later our team asks the AI before they ask each other."
- Headlines sentence case, concrete, ≤9 words on social. Section titles may be aphoristic pairs ("Where the value hides").
- Labels/eyebrows: UPPERCASE mono, mid-dot separators ("Q3 2026 · CLIENT NAME").
- Numbers specific and bare: 90 days, 93%, 1.33×.

## Surfaces & Templates

When files from this system are available, ALWAYS fork the matching template in `templates/` rather than building from scratch. When you only have this file, use these exact recipes:

**Web page:** nav header (83px) → hero on white → sections alternating white/#F6F7F9 with 96–128px gaps → optional navy stat band → navy footer with office status dots.

**Deck slide (1920×1080):** padding `100px 140px 150px`; mono eyebrow 20px/+5px tracking (#654C8F, teal on navy) → headline `deck-headline` (600 64px/1.1 −1.6px #192332) → content rows under a 2px navy top rule, each row `padding:38px 0` with 1px #E1E1E1 bottom hairline: mono/teal number 700 28px + subhead 600 32px + body 400 28px/40px #666. Folio bar pinned at bottom 64px, left/right 140px: ink mark 64px wide left, `MASLOW AI · 07` mono 15px +2px #A5A5A5 right. Dark variant: same geometry on #121D35, white headline, ghost gradient mark off-corner at 0.14. Six masters exist: title, section, content, stats, quote, closing.

**Document (Letter, 850×1100px @ 96dpi):** padding `72px 80px 64px`; lockup top-left + mono doc-type/date top-right (`INTERNAL MEMO · 2026-07-21`); title 600 30px/36px −0.7px; metadata block under a 1.5px navy rule with 1px hairline rows (TO/FROM/RE pattern); body `doc-body` 400 14px/23px #333; footer hairline with mono `MASLOW AI · INTERNAL` and `01 / 01` page numbers.

**Social canvases:** OG 1200×630 (padding 72px 84px), square 1080×1080, LinkedIn banner 1584×396. Default: navy #121D35 field, mono eyebrow in teal (20px/+5px), white headline 600 64px/1.12 −1.6px ≤9 words, white-mark lockup bottom-left, ghost gradient mark off bottom-right corner (`right:-60px;bottom:-108px;width:432px;opacity:.14`).

**Imagery:** photography cool and editorial (steel-blue grade, no warm Instagram filters). Case-study images get the teal→pink duotone mask (`linear-gradient(180deg,#86E8CE 0%,#E686B5 100%)` blended over grayscale). No stock-photo clichés, no 3D renders, no AI-art gloss.

## CSS Variables (drop-in)

For plain HTML/CSS or React, paste this block; for Tailwind, run `npx @google/design.md export --format css-tailwind DESIGN.md`.

```css
:root{
--maslow-navy:#192332;--maslow-band:#121D35;--maslow-pink:#DA85B2;--maslow-hot-pink:#EE7BB3;
--maslow-teal:#73C1AE;--maslow-orange:#EBA93D;--maslow-purple:#A070A6;--maslow-label-purple:#654C8F;
--maslow-yellow:#FFF860;--surface:#fff;--surface-alt:#F6F7F9;--border-card:#F1F1F1;--border-hairline:#E1E1E1;
--text-body:#333;--text-secondary:#666;--text-meta:#A5A5A5;--text-near-black:#1A1A1A;
--font-primary:"Manrope",-apple-system,sans-serif;--font-mono:"IBM Plex Mono",monospace;--font-meta:"DM Sans",sans-serif;
--shadow-card:17px 9px 5px rgba(0,0,0,.25);--radius-card:4px;--radius-btn:8px;--radius-pill:17px;
--ease-brand:cubic-bezier(.2,.7,.2,1);--dur-reveal:.7s;--section-gap:96px;--content-max:1200px}
a{color:#DA85B2}a:hover{color:#EE7BB3}
body{margin:0;font:400 17px/27px var(--font-primary);color:var(--text-body);background:#fff;-webkit-font-smoothing:antialiased}
```

## Assets & Fallbacks

- **Fonts:** if `assets/fonts/` is present, load `tokens/fonts.css` (vendored Manrope + DM Sans variable, IBM Plex Mono 400/500). Otherwise use Google Fonts:
  `<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=DM+Sans:wght@100..1000&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">`
  (Manrope/DM Sans/Plex Mono are OFL stand-ins for the commercial Formular and FoundersGroteskMono — never substitute anything else.)
- **Logo:** use the SVGs in `assets/` with relative paths. Missing assets → text lockup only, never a redrawn mark.
- **Templates:** `templates/deck-01…06`, `templates/doc-{proposal,memo,invoice}`, `templates/social-{og,square,banner}` are the canonical starting points. Fork, replace content, keep the system.
- Validate edits to this file with `npx @google/design.md lint DESIGN.md`.
