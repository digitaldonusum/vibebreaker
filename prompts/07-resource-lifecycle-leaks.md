# Pass 07 — Resource Lifecycle & Leaks

## Objective
Verify acquisition and release for every bounded resource.

## Inspect
Database connections/transactions, file handles, streams, sockets, HTTP bodies, subprocesses, timers/intervals, event listeners/subscriptions, temporary files, locks/semaphores, browser/page handles, worker pools.

## Questions
- Is release guaranteed on success, exception, cancellation, timeout, and early return?
- Is `finally` / `defer` / RAII / `using` or equivalent actually covering all exits?
- Are pools bounded and are borrowed resources always returned?
- Are listeners and timers removed when their owner is disposed/unmounted?
- Are temporary artifacts deleted when downstream work fails?

## Report
Flag any acquisition whose release cannot be proven from visible code. Explain the exhaustion/leak mode and what drives it.
