# Pass 20 — Verification & False-Positive Filter

## Objective
Adversarially verify all candidate findings from prior executed passes. This pass is always last.

## Hard rule
**You may not introduce new findings.** You may only relocate, confirm, merge, downgrade, reject, or leave unverified existing candidates.

## For each candidate
1. Relocate the cited code. If the evidence cannot be found and cannot be accurately relocated, mark `REJECTED` for citation mismatch.
2. Try to disprove the issue. Search for upstream/downstream validation, scoped queries, database constraints, locks, middleware, framework behavior, cleanup, idempotency controls, transactions, or tests that prevent the proposed failure.
3. If the defense exists and closes the path, mark `REJECTED` and cite the disproving location.
4. If deciding the issue depends on unseen code/config/schema/runtime behavior, mark `UNVERIFIED` and name the exact missing context.
5. Merge duplicates across passes and retain the clearest evidence-backed formulation.
6. Re-score severity conservatively. `CRITICAL` is allowed only when you can state a concrete reachable failure and material impact from visible evidence.

## Final output
Produce exactly:

### CONFIRMED
Severity-ordered, deduplicated, full finding contract.

### UNVERIFIED
Each with exact missing context required to decide it.

### REJECTED
One line each: `candidate ID — reason — disproving evidence/location`.

Then append coverage and the Top 10 missing tests from pass 19. Do not claim absolute security or production readiness.
