# WORKFLOW.md — Vague vs. Precise Prompting

## Setup
Same feature (a settings form with display name, email, and bio) was built twice in isolated Cursor sessions, on separate branches from `main`. Round 1 used a single lazy prompt ("Make a settings form"). Round 2 used a precise prompt with file references, constraints, example behavior, and an explicit verification step (write tests, run them).

## Correctness
Round 1 shipped a form wired directly into `App.tsx` — it worked end-to-end in the browser out of the box, including a Preferences section (theme select, notification toggle) the AI added on its own initiative, beyond what was asked.

Round 2 produced a stricter, spec-accurate `SettingsForm.tsx` — only the three fields requested, nothing extra — plus 5 passing Vitest tests covering required-field validation, invalid email rejection, and successful submission. But the diff shows `App.css` and `index.html`'s `<title>` reverted to the default Vite starter template in Round 2's branch. The AI built and tested the component in isolation but **never imported it into `App.tsx`** — so Round 2's form doesn't actually render when you run the app. This is the concrete AI mistake caught: a fully tested, well-built component that was never wired up, because the prompt specified the component file precisely but never said "and use it in App.tsx."

## Accessibility
Round 2 is clearly stronger here. Round 1's error messages used `aria-invalid={errors.email ? 'true' : undefined}` with no `aria-describedby`, so screen readers wouldn't reliably associate the error text with the field. Round 2 added `id="email-error"` on each error `<span>` and linked it via `aria-describedby={errors.email ? 'email-error' : undefined}` on every field, plus switched `aria-invalid` to a proper boolean. This was explicitly requested in the precise prompt and delivered correctly.

## Edge Cases
Round 1's bio field had no visible character limit enforced in the UI (the vague prompt never specified one, so the AI guessed at reasonable defaults). Round 2 explicitly enforced a 200-character max via the Zod schema per the constraint given, and it's covered by a test.

## Review Effort
Round 1 felt faster because it "just worked" in the browser immediately — but that speed is misleading. Reviewing it required manually clicking through the form to find gaps (no accessibility, no character limit, no tests to trust). Round 2 took longer to prompt and read through, but the verification step meant the AI caught and fixed its own mistake mid-session (a `react-hook-form` submit-handler issue during test-writing) before I ever saw it. The one bug that did slip through — the missing `App.tsx` integration — was easy to catch precisely *because* Round 2 came with tests and a clear spec to check against; Round 1 had no such anchor, so a similar gap there could easily have gone unnoticed.

**Net lesson:** Round 2 required more upfront prompt-writing time, but produced a component that was actually verifiable — and the integration gap it did have was catchable in seconds via the diff, whereas Round 1's silent gaps (accessibility, limits) would only surface much later, likely in production.
