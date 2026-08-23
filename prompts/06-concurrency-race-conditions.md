# Pass 06 — Concurrency & Race Conditions

## Objective
Find correctness failures caused by concurrent execution in this runtime and storage model.

## Inspect
- Shared mutable state accessed without synchronization.
- Check-then-act: exists→create, read→update, balance→debit, quota→consume, status→transition.
- Non-atomic read-modify-write against shared stores.
- Missing awaits / fire-and-forget side effects.
- Unsafe lazy initialization under simultaneous first access.
- Multiple locks with inconsistent acquisition order.
- Duplicate workers consuming the same logical task.

## Report
For each candidate, provide a 2-actor interleaving (A/B) that demonstrates the bad result. If the runtime or deployment model makes a category impossible, state why and move on.
