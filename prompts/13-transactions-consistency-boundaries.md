# Pass 13 — Transactions & Consistency Boundaries

## Objective
Find operations that update multiple things without an explicit consistency strategy.

## Inspect
- Multiple rows/tables/collections.
- Database + cache/search index.
- Database + file/object storage.
- Database + event/message publication.
- Database + third-party service.
- Cross-service writes.

## Questions
Is there a database transaction, conditional write, saga, outbox, inbox/dedup, reconciliation job, or compensation path? Is any external call performed inside a transaction in a way that creates long locks or ambiguous commit outcomes?

## Report
For every gap, name the precise inconsistent state and who can observe it. Pay special attention to cache updates before commit and events emitted for writes that may later roll back.
