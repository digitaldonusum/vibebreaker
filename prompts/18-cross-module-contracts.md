# Pass 18 — Cross-Module Contracts & Emergent Risks

## Objective
Ignore isolated single-file style issues. Audit assumptions that exist only at module/service boundaries.

## Coverage first
List boundaries where both producer and consumer are visible, and boundaries where only one side is visible. One-sided boundaries may produce only `NEEDS-CONTEXT`, never confirmed findings.

## Reconstruct the implicit contract
For each visible boundary determine:
- Who validates input?
- Who authorizes the action/object?
- Who owns retries and idempotency?
- Who owns the transaction/commit boundary?
- Who encodes/escapes/serializes?
- What invariants and ordering does each side assume?
- How are errors represented and propagated?

## Hunt
Responsibility gaps, duplicate retry/cache/encoding effects, invariant drift, throw-vs-result mismatch, ordering bugs, retry amplification, fan-out amplification, stale cache semantics, inconsistent timeout/cancellation ownership.

## Report
Every confirmed finding must name both sides and both locations.
