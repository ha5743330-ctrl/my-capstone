# My Capstone Project

> **Status:** Early scaffolding — repo structure and docs exist; application code and tooling are not set up yet.

<!-- Replace this block once you know the scope: -->
**What this will be:** _Describe the problem you are solving and who it is for (1–3 sentences). Example: “A web app that helps small businesses track inventory using AI-assisted categorization.”_

**What exists today:** README, contributor conventions ([CLAUDE.md](./CLAUDE.md)), MIT [LICENSE](./LICENSE), and `.gitignore`. There is no `package.json`, no `src/` folder, and no runnable app yet.

---

## Quick orientation (for first-time visitors)

| Question | Answer |
|----------|--------|
| Can I run this locally? | **Not yet.** Dependencies and scripts have not been added. |
| What language/framework? | **Not decided yet.** See [Stack](#stack) below. |
| Where is the code? | Nowhere yet — `src/` will hold application code once the stack is chosen. |
| How do I contribute? | See [Contributing](#contributing). For now, the project is solo; issues are welcome for feedback. |
| AI assistant rules? | See [CLAUDE.md](./CLAUDE.md) for commit style, branching, and repo conventions. |

---

## Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Language / framework | **TBD** | Pick one stack and update this table + `package.json` together. |
| Runtime | Node.js (LTS) | Pin version in `.nvmrc` or `engines` in `package.json` once added. |
| Package manager | npm | |
| Testing | **TBD** | e.g. Vitest, Jest |
| Lint / format | **TBD** | e.g. ESLint + Prettier |
| AI tooling (dev) | Claude Code | Conventions in [CLAUDE.md](./CLAUDE.md) |

---

## Prerequisites

Install these on your machine before development starts:

- **Node.js** — LTS recommended (e.g. `>=20`). Exact version will be pinned when `package.json` is added.
- **npm** — ships with Node.js
- **git**

Optional but useful once the app exists:

- **nvm** or **fnm** — to match the pinned Node version
- A **`.env.local`** file (never commit secrets — see [Environment variables](#environment-variables))

---

## Getting started

### 1. Clone the repo

```bash
git clone <repo-url>
cd my-capstone
```

Replace `<repo-url>` with the actual Git remote after the repository is published.

### 2. Install dependencies

```bash
npm install
```

**Note:** This step will work only after `package.json` exists. If you see “ENOENT: package.json”, the project is still in scaffolding — see [Roadmap](#roadmap).

### 3. Configure environment (when applicable)

Copy the example env file once it exists:

```bash
cp .env.example .env.local
```

Fill in values locally. Never commit `.env`, `.env.local`, or API keys. See [Environment variables](#environment-variables).

### 4. Run the project (when scripts exist)

```bash
npm run dev    # local dev server (script name may vary)
npm test       # run tests
npm run lint   # lint / format (if configured)
```

Exact commands will be documented here when `package.json` scripts are added.

---

## Environment variables

This repo ignores env files via `.gitignore` (`.env`, `.env.local`, etc.).

When you add secrets or config:

1. Create **`.env.example`** in the repo with variable **names** and placeholder values — no real secrets.
2. Document each variable in a table below.

| Variable | Required | Description |
|----------|----------|-------------|
| _TBD_ | — | Add rows when the app needs configuration |

---

## Project structure

Current layout:

```
.
├── CLAUDE.md       # AI assistant & contributor conventions
├── LICENSE         # MIT
├── README.md       # This file
└── .gitignore
```

Planned layout once development begins:

```
.
├── src/            # Application source code
├── tests/          # Tests (or colocated with src — see CLAUDE.md)
├── package.json    # Dependencies and npm scripts
└── .env.example    # Documented env var names (no secrets)
```

---

## Development conventions

Summarized from [CLAUDE.md](./CLAUDE.md):

- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/) — `feat:`, `fix:`, `chore:`, `docs:`, etc.
- **Branches:** `main` stays deployable; feature work on `feat/<short-name>`.
- **Changes:** Small, reviewable diffs; run lint/tests before committing once tooling exists.

---

## Roadmap

- [ ] Define problem statement, users, and MVP scope (update the top of this README)
- [ ] Choose stack and add `package.json`, lockfile, and pinned Node version
- [ ] Scaffold `src/` and initial entry point
- [ ] Add `.env.example` and document required env vars
- [ ] Add tests and CI
- [ ] Deploy

---

## Contributing

Solo capstone project for now. If you have questions or feedback:

- Open a **GitHub issue** (once the remote is set up)
- Follow conventions in [CLAUDE.md](./CLAUDE.md)

Before opening a PR (when collaboration starts): one logical change per commit, no secrets in diffs, and update this README if setup steps change.

---

## License

MIT — see [LICENSE](./LICENSE).
