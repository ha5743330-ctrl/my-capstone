# CLAUDE.md

Guidance for Claude Code (or any AI assistant) working in this repo.

## Project Overview

A capstone project scaffolded with Vite + React + TypeScript.

## Stack

- Language: TypeScript
- Runtime: Node.js (LTS)
- Package manager: npm
- Testing: Vitest + Testing Library
- Linting/formatting: ESLint (default Vite config)

## Conventions

- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`). One logical change per commit.
- **Branching:** `main` is always deployable. Feature branches: `feat/<short-name>`.
- **Code style:** run the formatter/linter before committing; no unformatted diffs.
- **File structure:** keep source in `src/`, tests colocated or in `tests/`.

## What Claude should do

- Prefer small, reviewable diffs over large rewrites.
- Explain reasoning briefly before non-trivial changes.
- Run tests/lint after edits when scripts exist.
- Ask before adding new dependencies.

## What Claude should avoid

- Don't rewrite unrelated files in the same commit.
- Don't invent config or secrets — flag if something's missing.

## Project Rules (learned from FE-04 prompting drill)

- Forms must use react-hook-form + zod, never uncontrolled inputs.
- Every form field's error message must be linked via aria-describedby, not just aria-invalid.
- When a prompt asks for a new component, explicitly confirm it's wired into the parent app (e.g. App.tsx) — don't assume integration happens automatically.
