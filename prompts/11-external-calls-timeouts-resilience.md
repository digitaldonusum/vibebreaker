# Pass 11 — External Calls, Timeouts & Resilience

## Objective
Audit every call that leaves the current process or trust boundary.

## Inspect
HTTP/RPC, database, cache, queue, object storage, email/SMS, payment/provider SDKs, subprocesses, model APIs, DNS/network clients.

For each call verify:
- Explicit timeout/deadline/cancellation exists.
- Transport failure is distinguishable from malformed or semantically invalid success data.
- Retries are bounded, back off, and only repeat operations safe to retry.
- A slow dependency cannot indefinitely consume request threads, event-loop capacity, connections, worker slots, or memory.
- User-facing/degraded behavior is deliberate.

## Output
Produce a table: `call site → dependency → timeout → retry policy → concurrency bound → failure behavior`. Flag infinite/default-unknown timeouts.
