# Pass 19 — Test Gaps & Validation Quality

## Objective
Map tests to risk rather than coverage percentage.

## Inspect
- Critical paths with no failure-path tests: auth, authorization, destructive data changes, money/value transfer, retries, transactions, external dependencies, and findings from earlier passes.
- Tests coupled to implementation details rather than externally observable behavior.
- Tests that only assert “does not throw” or lack meaningful state/result assertions.
- Shared mutable fixtures or order dependence.
- Missing concurrency, duplicate-delivery, timeout, cancellation, boundary-value, large-input, wrong-tenant/wrong-role, partial-failure, and rollback tests.

## Output
Produce a ranked **Top 10 missing tests** list. Each item must include the exact setup, action, and assertions that would catch the highest-impact plausible regression.
