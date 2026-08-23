# Pass 17 — API Contract Consistency

## Objective
Review the API as a consumer and locate inconsistent contracts likely to cause integration defects.

## Inspect
- Naming/casing conventions across endpoints.
- Error envelope shape and machine-readable error codes.
- HTTP/status/error-type consistency for the same semantic failure.
- Pagination, filtering, sorting, cursor/offset semantics.
- `null` versus omitted fields and empty collection behavior.
- Date/time, money, IDs, enums, booleans, and serialization conventions.
- Breaking field renames/removals or semantic changes without versioning/deprecation strategy where visible.

## Report
Express inconsistencies as pairs: `Endpoint A does X; Endpoint B uses Y for the same concept`. Avoid style-only findings unless they create a concrete client failure or migration risk.
