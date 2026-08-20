# Portable Brand OS and Taxonomy Capsules Implementation Plan

> Execute in order on `feature/brand-os-v1` and `feature/brand-os-consumer`. Do not push, tag, merge, or open a pull request without separate authorization.

**Goal:** Release Maslow Brand OS 1.1.0 as a portable agent plugin and apply its non-interactive taxonomy capsule rule to website blog and case-study routes.

**Architecture:** Keep all brand values and policies in the existing `src/` contract. Add portable root metadata and a unified fallback skill, generate harness-specific packages, then consume the new capsule token through the website’s vendored Brand OS layer and one semantic UI component.

**Stack:** Node.js ESM build scripts, Node test runner, TypeScript/React, CSS Modules, Vitest, Next.js, Playwright, deterministic ZIP packaging.

---

## 1. Add failing contract and validator tests

**Files:**

- Modify: `tests/brand-os.test.mjs`
- Modify: `fixtures/release-valid.html`
- Create: `fixtures/release-invalid-interactive-capsule.html`

Add assertions for version `1.1.0`, `radius.capsule === "9999px"`, portable plugin outputs, and release behavior. The valid fixture includes:

```html
<span data-taxonomy-label style="border-radius:var(--maslow-radius-capsule)">Manufacturing</span>
```

The invalid fixture includes a rounded taxonomy link and button. Run `npm test` and confirm the new tests fail for the missing token, package, and validator behavior.

## 2. Update the canonical contract

**Files:**

- Modify: `package.json`
- Modify: `src/tokens.json`
- Modify: `src/policies.json`
- Modify: `src/brand-contract.md`
- Modify: `README.md`
- Modify: `DESIGN.md`

Bump all contract versions to `1.1.0`. Add `radius.capsule`. Define taxonomy labels as non-interactive semantic capsules and keep all actions and structural surfaces square.

## 3. Add the portable plugin source interface

**Files:**

- Create: `plugin.json`
- Create: `SKILL.md`
- Create: `INSTALL.md`
- Modify: `.codex-plugin/plugin.json`
- Modify: `.claude-plugin/plugin.json`
- Modify: `skills/maslow-brand-core/SKILL.md`
- Modify: `skills/maslow-web-interface/SKILL.md`
- Modify: `skills/maslow-brand-review/SKILL.md`

Use the Agent Plugins v1 schema in `plugin.json`. Keep the root `SKILL.md` concise and require `src/brand-contract.md` before one focused task skill. Document repository, local-folder, and archive installation flows without modifying user-level agent directories.

## 4. Generate and validate harness distributions

**Files:**

- Modify: `scripts/build.mjs`
- Modify: `scripts/package-adapters.mjs`
- Create: `scripts/doctor.mjs`
- Modify: `tests/brand-os.test.mjs`
- Generated: `dist/**`
- Generated: `release/**`

Generate `agent-plugin`, `hermes`, and `openclaw` alongside existing adapters. Include the root manifest, root fallback skill, focused skills, canonical sources, immutable assets, templates, components, and validator. Add a doctor that checks versions, required files, source hashes, and designer logo hashes. Test fresh copies in temporary directories and deterministic archives.

## 5. Implement capsule components and validation

**Files:**

- Create: `components/badges/TaxonomyCapsule.jsx`
- Create: `components/badges/TaxonomyCapsule.d.ts`
- Create: `components/badges/TaxonomyCapsule.prompt.md`
- Modify: `components/badges/PillBadge.jsx`
- Modify: `components/badges/PillBadge.d.ts`
- Modify: `components/badges/PillBadge.prompt.md`
- Modify: `components/badges/badges.card.html`
- Modify: `components/cards/CaseStudyCard.jsx`
- Modify: `scripts/lib/validator.mjs`
- Modify: `scripts/build.mjs`

Render taxonomy capsules as spans with `data-taxonomy-label` and the capsule token. Update the validator to allow only this semantic exception and add a blocking `visual.interactive-capsule` rule.

## 6. Build and package Brand OS 1.1.0

Run:

```bash
npm test
npm run build
npm run package:adapters
npm run validate:release
```

Rebuild native starters only if their source contract requires it. Confirm every approved logo hash is byte-identical and record archive checksums.

## 7. Add failing website capsule tests

**Files:**

- Modify: `lib/brand-os.test.ts`
- Modify: `e2e/site.spec.ts`

Assert the vendored token exposes `radius.capsule`. Add browser checks for blog and case-study taxonomy labels: `SPAN`, no interactive role, `tabIndex === -1`, computed radius `9999px`, and non-pointer cursor. Assert a nearby CTA remains keyboard-focusable with `0px` radius. Run the focused tests and confirm failure before implementation.

## 8. Vendor Brand OS 1.1.0 and add the website primitive

**Files:**

- Modify: `vendor/maslow-brand-os/**`
- Modify: `app/globals.css`
- Modify: `lib/brand.ts`
- Create: `components/ui/TaxonomyCapsule.tsx`
- Create: `components/ui/TaxonomyCapsule.module.css`
- Modify: `AGENTS.md`

Copy the generated npm distribution at version `1.1.0`, map `--radius-capsule`, expose the typed radius, and document the non-interactive exception in repository guidance.

## 9. Replace blog taxonomy labels

**Files:**

- Modify: `app/blog/page.tsx`
- Modify: `app/blog/page.module.css`
- Modify: `app/blog/[slug]/page.tsx`
- Modify: `app/blog/[slug]/page.module.css`

Use `TaxonomyCapsule` for article type, featured state, category, and explicit article tags. Leave dates, authors, reading time, and links unchanged.

## 10. Replace case-study taxonomy labels

**Files:**

- Modify: `app/case-studies/page.tsx`
- Modify: `app/case-studies/page.module.css`
- Modify: `app/case-studies/infinite-ai-os/page.tsx`
- Modify: `app/case-studies/agenthub/page.tsx`
- Modify: `app/case-studies/case-study.module.css`

Use `TaxonomyCapsule` for case type, sector, engagement type, evidence classification, result labels, stack taxonomy, deliverables, and pipeline taxonomy where they are purely descriptive. Do not change links, controls, status mechanisms, or content.

## 11. Verify website behavior and visual proof

Run:

```bash
npm test
npm run lint
npm run build
npx playwright test
```

Render desktop and mobile blog and case-study routes. Inspect label semantics, keyboard focus, radius, contrast, text spacing, reduced motion, overflow, and console output. Capture final screenshots under `output/playwright/capsule-release-proof/`.

## 12. Review and commit both repositories

Inspect only task-scoped diffs. Exclude user-owned untracked folders and temporary proof infrastructure. Commit with Conventional Commits:

```text
feat(brand): package portable Brand OS 1.1
feat(content): distinguish taxonomy capsules
```

Report the two commit hashes, release archives, test evidence, screenshots, and the fact that no push, tag, PR, or merge occurred.
