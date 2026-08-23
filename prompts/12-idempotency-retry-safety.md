# Pass 12 — Idempotency & Retry Safety

## Objective
Assume every state-changing operation can be delivered twice.

## Sources of duplication
Client retry, double-click, network replay, webhook retry, queue redelivery, worker restart, scheduler overlap, timeout after server-side success.

## Inspect
- Duplicate payments/orders/rows/files.
- Duplicate emails, notifications, webhooks, or external side effects.
- Counters/inventory/quota incremented or decremented twice.
- Create operations without durable uniqueness/idempotency keys.
- At-least-once consumers with non-idempotent handlers.
- Endpoints that clients may retry despite unsafe semantics.

## Report
Classify every material mutation as:
1. `NATURALLY_IDEMPOTENT`
2. `PROTECTED` — durable key/unique constraint/state machine/conditional write
3. `UNSAFE`

For unsafe cases describe the duplicate-delivery sequence and result.
