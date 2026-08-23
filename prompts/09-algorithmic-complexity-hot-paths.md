# Pass 09 — Algorithmic Complexity & Hot Paths

## Objective
Find code that is acceptable on tiny demo data but degrades sharply at realistic scale.

## Method
Identify high-frequency handlers and paths processing the largest collections/files/payloads. For each, state a workload assumption such as `N items/request, M concurrent requests`.

## Inspect
- Nested iteration over unbounded inputs.
- Linear scans inside loops causing accidental O(n²) or worse.
- Recomputed invariants or repeated expensive parsing/serialization.
- Repeated regex/crypto/DOM/AST work that could be hoisted or cached safely.
- Full materialization where streaming/chunking is expected.

## Report
For every finding, name the scale at which it becomes harmful. Patterns that never encounter meaningful scale are `INFO/NIT`, not severe findings.
