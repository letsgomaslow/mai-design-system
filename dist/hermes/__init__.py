"""Hermes native plugin wrapper for Maslow Brand OS.

The repository already exposes an Agent Plugins v1 manifest (`plugin.json`) and
root skill. Hermes' native plugin loader also requires `plugin.yaml` and an
`__init__.py` with `register(ctx)`. This wrapper only registers the bundled
skills; it does not add tools, hooks, middleware, or runtime side effects.
"""

from __future__ import annotations

from pathlib import Path


def _frontmatter_value(skill_md: Path, key: str) -> str:
    """Return a simple scalar value from SKILL.md YAML frontmatter."""
    try:
        source = skill_md.read_text(encoding="utf-8")
    except OSError:
        return ""
    if not source.startswith("---\n"):
        return ""

    for line in source.splitlines()[1:]:
        if line == "---":
            break
        if line.startswith(f"{key}:"):
            return line.split(":", 1)[1].strip().strip('"\'')
    return ""


def _register_skill(ctx, skill_md: Path, seen: set[str]) -> None:
    if not skill_md.exists():
        return

    name = _frontmatter_value(skill_md, "name") or skill_md.parent.name
    description = _frontmatter_value(skill_md, "description")
    if not name or name in seen:
        return

    ctx.register_skill(name, skill_md, description=description)
    seen.add(name)


def register(ctx) -> None:
    """Register Maslow Brand OS skills with Hermes."""
    root = Path(__file__).resolve().parent
    seen: set[str] = set()

    # Root fallback skill for harnesses that load one skill from a repository.
    _register_skill(ctx, root / "SKILL.md", seen)

    # Focused task skills plus legacy compatibility wrappers.
    skills_dir = root / "skills"
    if skills_dir.is_dir():
        for skill_md in sorted(skills_dir.glob("*/SKILL.md")):
            _register_skill(ctx, skill_md, seen)
