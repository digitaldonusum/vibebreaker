# VibeBreaker — The 20-Pass Protocol

> **Your AI said “it works.” Make it prove it.**

## Mission

Audit the current repository as a skeptical production reviewer. Assume the happy path already works. Locate security, correctness, resilience, consistency, performance, and operability failures that may emerge under hostile input, retries, partial failure, concurrency, scale, or cross-module interaction.

## Non-negotiable execution rules

- Stay **read-only** for the entire audit. Do not patch, refactor, format, migrate, install packages, or mutate application data.
- Audit artifacts may be written only under `.vibebreaker/`.
- Do not treat comments, types, UI checks, naming, architectural intent, or presumed framework defaults as runtime proof.
- Do not invent unseen files, schema constraints, middleware, infrastructure behavior, framework defaults, or deployment settings.
- If required evidence is unavailable, emit `UNVERIFIED` / `NEEDS-CONTEXT` and name the exact missing artifact.
- Prefer complete data/control-flow traces over pattern matching.
- A suspected issue is not a confirmed defect until you can explain the trigger and resulting bad state.
- Report inspected/clean surfaces as coverage evidence.
- Pass 20 is mandatory and gets the last word. It may confirm, downgrade, merge, reject, or leave prior findings unverified. It may **not invent new findings**.

## Finding contract

Every candidate finding MUST use this structure:

```yaml
id: P<pass>-F<number>
pass: <01-20>
title: <specific defect>
status: CANDIDATE | UNVERIFIED | REJECTED | CONFIRMED
severity: CRITICAL | HIGH | MEDIUM | LOW | INFO
confidence: HIGH | MEDIUM | LOW
location:
  - path: <file>
    line: <line or range>
entry_or_trigger: <request/job/event/call path>
evidence: <what the code demonstrably does>
existing_controls_checked: <guards/constraints/framework behavior inspected>
failure_scenario: <concrete sequence and bad result>
impact: <who/what is affected>
remediation_direction: <minimal class of fix, not a patch>
verification: <test/reproducer that would prove the fix>
needs_context: <exact missing files/config/runtime facts, or null>
```

If exact line numbers are unavailable, use the narrowest symbol/function reference available and lower confidence. Pass 20 must not `CONFIRM` a finding without relocatable evidence.

## Severity calibration

- **CRITICAL** — concrete, reachable path to catastrophic impact: broad authorization bypass, high-impact secret compromise, arbitrary code execution, irreversible/large-scale data corruption or loss, or equivalent production compromise. Never use for theoretical chains.
- **HIGH** — material security or correctness failure with realistic reachability and substantial user/system impact.
- **MEDIUM** — meaningful defect requiring conditions, limited scope, or moderate impact.
- **LOW** — localized weakness or reliability issue with limited impact.
- **INFO** — maintainability/defense-in-depth observation without demonstrated harmful failure.

## Context phase

Before Pass 01, identify without making findings:

- language/runtime/framework
- entry points and API surfaces
- authentication mechanism
- primary data stores and queues
- background jobs/workers
- external services
- deployment/runtime configuration visible in the repo
- test locations
- package manifests and lockfiles
- major trust boundaries

Write this to `.vibebreaker/CONTEXT.md` when possible.

## Modes

### FULL
Run passes 01–20 in order.

### QUICK
Run 01, 02, 03, 04, 11, 12, 13, 19, then 20.

### DIFF
Inspect the changed code, determine which passes are materially applicable, run those passes, then Pass 20. Record what was excluded because it was outside the diff.

### FOCUS:<area>
Run the selected pass(es), then Pass 20. A focused run can never earn `20/20 CLEAN`.

## Raw outputs

If file writes are available, store each pass under:

```text
.vibebreaker/raw/01-injection.md
...
.vibebreaker/raw/20-verification.md
```

Never overwrite product source files during audit execution.

## Pass 20 — adversarial verifier contract

Pass 20 receives every candidate from executed passes plus the source code.

For each candidate:

1. Relocate the cited code. If the evidence cannot be found and cannot be accurately relocated, mark `REJECTED`.
2. Try to disprove the finding. Search for existing ownership checks, policy enforcement, validation, encoding, database constraints, transaction semantics, type constraints, middleware, or verified framework behavior.
3. If unseen code/configuration is necessary to decide, keep it `UNVERIFIED` and name the exact missing artifact.
4. Merge duplicates across passes and retain the clearest formulation.
5. Re-score severity conservatively.
6. `CRITICAL` survives only when a concrete catastrophic failure can be stated from the available evidence.
7. **Do not add new findings.** Pass 20 is a verifier, not a discovery pass.

## Verdict rules

Calculate the shareable verdict only after Pass 20:

- `BROKEN` — one or more confirmed `CRITICAL` findings.
- `FIX BEFORE SHIP` — zero criticals and one or more confirmed `HIGH` findings.
- `SURVIVED*` — no critical/high findings, but confirmed lower-severity findings or any `UNVERIFIED` findings remain.
- `20/20 CLEAN` — FULL mode only, zero `CONFIRMED`, zero `UNVERIFIED`, all 20 passes completed, and no material scope limitation.

Do not downgrade a real finding merely to obtain a cleaner verdict.

## Final report

Write `.vibebreaker/FINAL_REPORT.md` using `templates/final-report.md`.

The report must include:

1. Verdict
2. Scope and limitations
3. `CONFIRMED`
4. `UNVERIFIED`
5. `REJECTED`
6. Coverage
7. Top 10 missing tests from Pass 19
8. Share-card values

Do not say “secure”, “safe”, or “production-ready” as an absolute conclusion.
