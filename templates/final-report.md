# VibeBreaker Final Report

## Verdict

`BROKEN | FIX BEFORE SHIP | SURVIVED* | 20/20 CLEAN`

One sentence explaining why this verdict applies.

## Scope

- Commit / branch:
- Mode:
- Stack:
- Passes completed:
- Inspected surfaces:
- Excluded / unavailable context:
- Material scope limitation: YES / NO

## Scoreboard

- Passes executed: 0 / 20
- Confirmed: 0
- Critical: 0
- High: 0
- Medium: 0
- Low: 0
- Info: 0
- Unverified: 0
- Rejected candidates: 0
- First critical pass: NONE

## CONFIRMED

Order by severity, then confidence. Use the full finding contract.

## UNVERIFIED

For each item, name the exact missing file, schema, deployment setting, framework behavior, runtime evidence, or external configuration required to decide it.

## REJECTED

One line per rejected candidate:

`ID — reason — disproving location/evidence`

## Coverage

List reviewed endpoints, jobs, data flows, configuration sources, modules, dependency manifests, and inspected surfaces that appeared clean.

## Top 10 missing tests

Rank the ten tests most likely to catch high-impact regressions. Each entry must state the exact scenario and assertion.

## Share card

```text
VIBE//BREAKER

VERDICT: <verdict>
PASSES: <executed>/20
CRITICAL: <n>
HIGH: <n>
CONFIRMED: <n>
UNVERIFIED: <n>
FIRST BREAK: <pass or NONE>
```

## Release note

Do not assert absolute safety. State exactly what was and was not demonstrated by this audit.
