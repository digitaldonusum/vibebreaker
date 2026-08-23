# Pass 10 — Memory & Unbounded Growth

## Objective
Hunt only state whose retained memory can grow without a hard bound or cleanup policy.

## Inspect
- Caches without eviction, TTL, size bound, or lifecycle reset.
- Module/global collections appended per request/user/job.
- Unbounded queues, retry buffers, trace buffers, in-memory logs.
- Whole-file or whole-dataset loading to process a subset.
- Large object graphs retained by closures, listeners, timers, promises/futures, static references.
- Per-user/session state never purged.

## Report
For each finding state the growth driver (per request/user/message/day/file size), retained object type, and terminal failure mode such as OOM, GC thrash, latency collapse, or process restart.
