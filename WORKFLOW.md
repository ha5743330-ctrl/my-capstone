# WORKFLOW.md — Vague vs. Precise Prompting

## Setup
Same feature (a settings form with display name, email, and bio) was built twice in isolated Cursor sessions, on separate branches from `main`. Round 1 used a single lazy prompt ("Make a settings form"). Round 2 used a precise prompt with file references, constraints, example behavior, and an explicit verification step (write tests, run them).

## Correctness
Round 1 shipped a form wired directly into `App.tsx` — it worked end-to-end in the browser out of the box, and the AI added a Preferences section (theme select, notification toggle) on its own initiative, beyond what was asked.

Round 2 produced a stricter, spec-accurate `SettingsForm.tsx` — only the three fields requested, nothing extra — plus 5 passing Vitest tests covering required-field validation, invalid email rejection, and successful submission. It was also wired into `App.tsx` correctly. The concrete AI mistake caught in Round 2: while writing the test suite, the AI's first attempt at the submit test failed because `react-hook-form` calls `onSubmit` with the native form event attached, which the initial test assertion didn't account for. The AI's own log shows it catching this mid-session ("Submit test fix kar raha hoon — react-hook-form `onSubmit` ko event ke saath bhi call karta hai") and correcting the test before presenting the final result. This is exactly what the verification step is for: the mistake never reached me, because the test suite caught it first.

## Accessibility
Round 2 is clearly stronger here. Round 1's error messages used `aria-invalid={errors.email ? 'true' : undefined}` with no `aria-describedby`, so screen readers wouldn't reliably associate the error text with the field. Round 2 added `id="email-error"` on each error `<span>` and linked it via `aria-describedby={errors.email ? 'email-error' : undefined}` on every field, plus switched `aria-invalid` to a proper boolean. This was explicitly requested in the precise prompt and delivered correctly.

## Edge Cases
Round 1's bio field had no visible character limit enforced (the vague prompt never specified one, so the AI guessed at reasonable defaults and left it open-ended). Round 2 explicitly enforced a 200-character max via the Zod schema per the constraint given, and it's covered by a test.

## Review Effort
Round 1 felt faster because it "just worked" in the browser immediately — but that speed is misleading. Reviewing it required manually clicking through the form to find gaps (no accessibility linking, no character limit, no tests to trust — I had to eyeball the code to know it was even reasonably correct). Round 2 took longer to write the prompt and read through the response, but the verification step meant the AI caught and fixed its own mistake mid-session before I ever saw a broken test. My own review time on Round 2 was mostly spent confirming the tests actually ran and passed (`5 passed (5)`), not hunting for bugs by hand.

**Net lesson:** Round 2 required more upfront prompt-writing time, but produced a component I could trust without manually re-deriving its correctness — the tests did that work. Round 1's silent gaps (accessibility, limits) would only have surfaced later, likely after shipping, whereas Round 2's one real hiccup was caught and fixed inside the same session, before it ever reached me.
