# Maslow Brand OS 1.1.0

Maslow Brand OS is the single source of truth for Maslow AI branding across websites, presentations, Word documents, PDFs, social campaigns, and agent-generated work. The canonical inputs live in `src/`. Everything else is a consumer, generated adapter, reusable component, preview, or artifact template.

## Start here

- `src/tokens.json` is the only color, typography, radius, and layout token authority.
- `src/policies.json` is the only messaging, evidence, and interaction policy authority.
- `src/logo-assets.json` is the only logo variant, provenance, usage, dimension, and hash authority.
- `src/brand-contract.md` is the compact mandatory contract for people and agents.
- `skills/maslow-brand-core/SKILL.md` loads that contract. Focused task skills load the core before their own instructions.
- `scripts/validate.mjs` checks draft or release output.
- `scripts/build.mjs` reproducibly generates package exports and platform adapters.

Do not copy values into a skill or invent a separate rule. Change canonical source, regenerate outputs, run validation, and version the release.

## Non-negotiable hierarchy

- Navy `#192332` is the primary action on light surfaces. White is the inverse primary action on navy.
- Pink `#EE7BB3` is a sparse interaction signal or exceptional emphasis. It is never a default element fill.
- Purple supplies accessible links and focus treatment.
- Buttons, action links, cards, panels, inputs, navigation controls, interactive filters, interactive chips, and interactive badges use 0px structural radius.
- Non-interactive taxonomy and content-classification labels use the capsule radius. They remain plain text spans with no click, link, focus, or pointer semantics.
- Circles remain only when shape carries meaning, including avatars, status dots, step markers, and small signals.
- Manrope, DM Sans, and IBM Plex Mono are vendored in `assets/fonts/`.
- Seven designer-supplied logo masters live in `assets/logos/`. Their filenames are normalized for agents, but every PNG remains byte-identical to the designer handoff and is hash-locked in `src/logo-assets.json`.
- Complete lockups are used when the Maslow AI name must be visible. Symbol-only masters are reserved for favicons, avatars, small identifiers, and deliberate decorative use.

## Position and evidence

The primary external position is: "AI employees for the work that waits on your busiest people."

Lead with a waiting workflow, its responsible owner, the human decision, the deliverable, the evidence status, and one next action. Use US English and direct outcome-first language. Do not use em dashes, hype, fabricated metrics, placeholder testimonials, or unsupported client outcomes.

Every claim uses one status beside the claim:

- `production`: observed evidence with a source.
- `modeled`: an estimate with assumptions and a source.
- `illustrative`: an example that is not a client result.
- `in_preparation`: an artifact or proof item not yet reviewed.

## Build and validate

```sh
npm test
npm run build
node scripts/validate.mjs --mode draft --input path/to/artifact
node scripts/validate.mjs --mode release --input path/to/artifact
```

Release mode must report zero blocking violations. Unresolved `{{VARIABLES}}` are expected in starter templates and block release until replaced.

## Distribution

`npm run build` creates:

- `dist/npm` for `@maslow-ai/brand-os` token, asset, and manifest exports.
- `dist/agent-plugin` as the portable Agent Plugins v1 package.
- `dist/codex` and `dist/claude` multi-skill plugin bundles.
- `dist/hermes` and `dist/openclaw` harness-ready packages generated from the same contract.
- `dist/chatgpt` as one self-contained skill folder.
- `dist/generic` with the contract, schemas, templates, assets, and validation instructions.

The repository root and `dist/agent-plugin` conform to Agent Plugins v1. The root `SKILL.md` supports harnesses that install one skill from a repository root. The original standalone skill folders remain preserved outside this repository for compatibility, but their policy is superseded by `src/`.
