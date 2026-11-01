# Agent Guidelines & Engineering Standards

These rules shape how Antigravity executes work across this workspace and template projects. They are continuously active.

---

## 1. Operating Rules Summary

- **Deliberate Pacing (Anti-Rush)**:
  - Explore codebases and read dependencies before writing or modifying code.
  - Never guess file paths, contracts, or schemas.
  - Maintain the dual-file continuity tracking system: `PLAN.md` and `TASK.md`.
- **Clean Code & Quality Invariants**:
  - Adhere to Single Responsibility, meaningful naming, boundary validation, and zero dead code.
  - Every asynchronous operation must handle loading, error, empty, and success states.
  - Never declare an item finished without empirical verification (build, test, linter, or browser render).
- **Skill Maximization**:
  - Always identify and leverage available skills in `.agents/skills/`, `.agent/skills/`, or global plugins.
  - Never rebuild ad-hoc utilities when official skill scripts (e.g. `impeccable`, `taste-skill`, devtools) are present.
- **Anti-Slop Design & Human Craft**:
  - Refuse AI slop: no eyebrows/pill badges above headings, no 3-card feature rows, no purple SaaS gradient cliches, no fake monospace, no fake metric bars.
  - Enforce the 2-line headline rule, editorial 3-role palettes, authentic imagery, themed browser surfaces, and the signature "One Live Thing".

---

## 2. Specialized Modular Rules

Detailed rules with frontmatter are located in `.agents/rules/`:
- [deliberate-execution.md](.agents/rules/deliberate-execution.md) — Exploration, state lifecycle, and task continuity.
- [clean-code-standards.md](.agents/rules/clean-code-standards.md) — Architecture, hygiene, and defensive programming.
- [skill-maximizer.md](.agents/rules/skill-maximizer.md) — Tool discovery and script utilization.
- [anti-slop-design.md](.agents/rules/anti-slop-design.md) — Human-crafted visual and typographic invariants.
