# Portable Maslow Brand OS and Taxonomy Capsules

Date: 2026-08-19
Status: Approved for implementation
Release: Maslow Brand OS 1.1.0

## Outcome

Maslow Brand OS becomes a portable Agent Plugins v1 package and remains the single source of truth for Maslow-branded output. The website consumes the same 1.1.0 contract and uses semantic capsules only for non-interactive taxonomy labels on blog and case-study routes.

## Scope

This release includes:

- A root Agent Plugins v1 `plugin.json` with focused Agent Skills under `skills/`.
- A root `SKILL.md` fallback for harnesses that install one skill from a repository root.
- Generated Codex, Claude Code, ChatGPT, Hermes, OpenClaw, generic, npm, and portable Agent Plugin distributions.
- Deterministic manifests, checksums, installation guidance, and fresh-install verification.
- A canonical taxonomy-capsule token, policy, component, validator rules, and examples.
- Website changes limited to non-interactive blog and case-study taxonomy labels.

This release does not change general website layout, navigation, buttons, cards, forms, copy, or unrelated routes. It does not modify or re-encode designer-supplied logo masters.

## Canonical architecture

`src/tokens.json`, `src/policies.json`, `src/logo-assets.json`, and `src/brand-contract.md` remain authoritative. Root plugin metadata, root skill guidance, platform manifests, CSS, TypeScript, distributions, and archives are generated or validated against those sources.

The repository root is a portable plugin source:

```text
plugin.json
SKILL.md
skills/
src/
assets/
templates/
components/
scripts/
```

Agent Plugins v1 clients discover focused skills from `skills/*/SKILL.md`. Root-skill clients load `SKILL.md`, which requires the compact core contract first and then routes to one relevant focused skill. The root skill contains no independent token values.

## Semantic shape contract

The Brand OS uses shape to communicate behavior:

- Actions and structural surfaces remain square at `0px`: buttons, links styled as actions, navigation controls, inputs, cards, panels, interactive filters, interactive chips, and interactive badges.
- Non-interactive taxonomy and content-classification labels use `radius.capsule`, equal to `9999px`.
- Taxonomy capsules must render as text-level elements, normally `span`, and must not receive `href`, click handlers, button/link roles, positive keyboard focus, or a pointer cursor.
- Circles remain limited to avatars, status dots, step markers, and meaningful small signals.
- A rounded element that is interactive is a release-blocking violation.

The visual distinction is intentional: capsules describe content; square controls perform actions.

## Website component contract

`components/ui/TaxonomyCapsule.tsx` is the only new website primitive. It renders a `span` with `data-taxonomy-label`, exposes only appearance and text props, and does not accept event or navigation props. Tone and size mappings live in its CSS module.

Blog and case-study routes replace page-local badge/tag spans with this component. Dates, authors, evidence prose, and other ordinary metadata remain plain text. Existing links and buttons remain unchanged and square.

## Validator contract

Release validation must:

- Permit the canonical capsule radius only on semantic taxonomy labels.
- Reject rounded links, buttons, controls, cards, panels, inputs, or labels with interactive semantics.
- Reject a taxonomy capsule implemented as `a`, `button`, an interactive ARIA role, a focusable element, or an element with inline interaction handlers.
- Continue enforcing approved colors, fonts, logos, evidence labels, claim provenance, and public-copy rules.

Draft mode reports the same findings as warnings. Release mode blocks them.

## Distribution contract

The build emits:

- `dist/agent-plugin`: portable Agent Plugins v1 package.
- `dist/codex`: Codex-native plugin bundle.
- `dist/claude`: Claude Code-native plugin bundle.
- `dist/chatgpt`: one self-contained ChatGPT skill.
- `dist/hermes`: Agent Plugins v1 package plus Hermes install guidance.
- `dist/openclaw`: root-skill package plus OpenClaw install guidance.
- `dist/generic`: contract, schemas, assets, templates, and validation instructions.
- `dist/npm`: website-consumable tokens, types, assets, and manifest.

The release script creates deterministic archives and SHA-256 checksums for every distribution. Fresh-install tests use temporary directories only and never overwrite user-level skill folders.

## Compatibility and versioning

This is a minor release because it adds compatible adapters, a new semantic token, and new templates without changing the primary brand position, logo masters, action hierarchy, or existing public package names. Consumers pin `v1.1.0`.

Legacy standalone Maslow skills remain wrappers. They load `maslow-brand-core` and must not define independent colors, shapes, logo rules, or messaging policy.

## Acceptance

The release is accepted when:

- Canonical and generated versions all equal `1.1.0`.
- Portable manifests conform to Agent Plugins v1 and every skill has valid Agent Skills frontmatter.
- All archives reproduce byte-for-byte after rebuilding from clean canonical sources.
- Designer logo hashes remain unchanged in source, native artifacts, and every distribution.
- A compliant taxonomy capsule passes release validation and interactive rounded variants fail.
- Blog and case-study labels render as non-focusable spans with `9999px` radius and non-pointer cursors.
- All website actions remain focusable and use `0px` radius.
- Unit, content, lint, build, Playwright, visual, and release-validation checks pass.
- Desktop and mobile screenshots show the approved capsule-versus-square hierarchy without overflow or contrast regressions.
