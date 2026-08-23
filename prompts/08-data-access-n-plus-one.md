# Pass 08 — Data Access Patterns & N+1

## Objective
Audit how application code interacts with persistent stores for avoidable fan-out and unbounded work.

## Inspect
- Queries or remote reads inside loops (N+1).
- Missing batch operations where the API/store supports them.
- Unbounded queries against growing tables/collections.
- Fetch-all / `SELECT *` when only a small projection is used.
- Filtering, sorting, joining, aggregation, or pagination in application memory that the store should perform.
- Repeated identical reads within one request/job without an intentional reason.
- Write patterns likely to create lock contention/hot rows.

## Report
Estimate query count as a function of input size where possible. If schema/index definitions are unavailable, label index observations `NEEDS-CONTEXT` and name the required schema/index artifact.
