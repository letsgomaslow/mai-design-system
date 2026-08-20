# Install Maslow Brand OS

Use a pinned release or Git tag so every agent uses the same contract version. Brand OS requires no credentials and adds no MCP server or executable runtime.

## Hermes

Install the tagged repository as a portable Agent Plugin, then enable it:

```sh
hermes plugins install letsgomaslow/mai-design-system --no-enable
hermes plugins enable maslow-brand-os
hermes plugins doctor maslow-brand-os --ci
```

Use `skills_list` to discover the qualified skill name and `skill_view` to load only the relevant focused skill.

## OpenClaw

Install a checked-out or extracted package whose root contains `SKILL.md`:

```sh
openclaw skills install ./maslow-brand-os --as maslow-brand-os
openclaw skills info maslow-brand-os
openclaw skills check
```

OpenClaw does not install ZIP paths directly. Extract the release archive first, or use the tagged Git repository.

## Codex and Claude Code

Use the matching archive from `release/`. Each archive includes its native manifest, focused skills, canonical contract, immutable assets, templates, and validator.

## Generic Agent Skills harnesses

Point the harness at the repository root `SKILL.md`, or install the portable Agent Plugin directory when the harness supports Agent Plugins v1. The skill must retain access to `src/`, `skills/`, `assets/`, `templates/`, and `scripts/`.

## Verify package integrity

Run the bundled doctor from the package root:

```sh
node scripts/doctor.mjs
```

Compare the downloaded archive with `release/SHA256SUMS.json` before distribution.
