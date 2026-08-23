# VibeBreaker — Agent Entry Point

When asked to run VibeBreaker:

1. Read `AUDIT_PROTOCOL.md` completely.
2. Determine the requested mode (`FULL` by default).
3. Read only the pass files required for that mode from `prompts/`.
4. Remain read-only with respect to product code and product data.
5. Write audit-only artifacts under `.vibebreaker/` if writes are available.
6. Preserve evidence as relocatable `file:line` references.
7. Never convert missing context into a positive finding.
8. Run Pass 20 last. It is the sole authority for final finding status.
9. Write the final result using `templates/final-report.md`.
10. Apply the verdict rules in `AUDIT_PROTOCOL.md` only after verification.

If fixes are requested, finish the audit first, then propose a separate remediation plan. Never silently mix review and repair.
