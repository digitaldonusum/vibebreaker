# Pass 16 — Logging, Observability & Auditability

## Objective
Determine whether important production failures and security events can be reconstructed externally.

## Inspect
- Error logs with correlation/request/job identifiers and useful non-sensitive context.
- Appropriate log levels rather than everything INFO/ERROR.
- Audit trail for login failures, permission denials, sensitive/admin mutations, destructive actions, role changes, key configuration changes.
- Silent failures and swallowed background-task errors.
- Tight-loop/noisy logs and unbounded cardinality hazards.
- Cross-check pass 04 for secrets/PII in logs.

## Report
Prioritize the diagnostic blind spots that would make a serious incident non-reconstructable: what happened, to which resource, by whom, and in which request/job cannot be determined.
