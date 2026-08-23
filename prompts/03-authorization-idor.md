# Pass 03 — Authorization & IDOR

## Objective
Assume authentication works. Audit who may perform each action on each object.

## Inspect
For every operation touching user-, tenant-, organization-, project-, or role-owned data:
- Is ownership/tenant/role checked server-side before the effect?
- Is the check applied on every path: read, update, delete, bulk, batch, export, import, background job, admin variant, webhook, server action, GraphQL resolver, RPC?
- Are object IDs accepted from the client and used directly without scoped lookup or policy enforcement?
- Are authorization checks performed only in the UI, only on the happy path, or after a mutation/effect?
- Can a privileged field be mass-assigned or a tenant boundary be changed through payload data?

## Report
Produce an operation-by-operation decision table. Flag IDOR/BOLA only when you can trace a caller-controlled object reference to an operation lacking a proven ownership/role/tenant check.
