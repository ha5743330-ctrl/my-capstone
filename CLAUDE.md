# CLAUDE.md

Guidance for Claude Code (or any AI assistant) working in this repo.

## Project Overview

<!-- 2-3 sentences on what this project does and its current phase. -->

## Stack

- Language: <!-- e.g. TypeScript -->
- Runtime: Node.js (LTS)
- Package manager: npm
- Testing: <!-- e.g. Vitest -->
- Linting/formatting: <!-- e.g. ESLint + Prettier -->

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
