# VibeBreaker — The 20-Pass Prompt Pack
Read `AUDIT_PROTOCOL.md` before using these prompts. Run pass 20 last.

---

# Pass 01 — Injection & Untrusted Input

## Objective
Trace every externally influenced value from entry point to dangerous sink.

## Inspect
- User input, route/query/body params, headers, cookies, uploaded files.
- Queue/event payloads, third-party API responses, webhooks, environment/config values where attacker or operator influence is plausible.
- SQL/NoSQL queries, shell/process execution, filesystem paths, templates, HTML/DOM output, redirects/URLs, deserializers, dynamic imports, expression/eval-like execution.

## Method
For every entry point, follow the value through validation, transformation, persistence, retrieval, and final sink. Distinguish validation from encoding/escaping: each sink needs a context-appropriate defense. Parameterization for database queries does not prove safety for shell, path, HTML, template, or URL contexts.

## Report
- Candidate findings for every path where untrusted data reaches a sink without a proven context-appropriate control.
- The exact missing defense and concrete trigger/failure scenario.
- A coverage table of every inspected entry point, including those found clean.
- If a framework is believed to auto-escape/parameterize, verify the exact API usage or mark it `NEEDS-CONTEXT`.

---

# Pass 02 — Authentication & Session Management

## Objective
Audit only how identity is established, maintained, refreshed, recovered, and invalidated.

## Inspect
- Protected routes accidentally reachable without authentication.
- Session/token creation: entropy, scope, expiration, rotation, fixation resistance.
- Credential storage and comparison: password hashing configuration and safe secret comparison where relevant.
- Logout/revocation: whether access is actually invalidated rather than only cleared client-side.
- Password reset/account recovery: token lifetime, single use, user enumeration, invalidation after password change.
- Remember-me and refresh-token storage, reuse detection, rotation, revocation, device/session semantics.

## Report
For every mechanism, state what code proves and what depends on unseen framework/identity-provider configuration. Do not mix authorization findings into this pass unless authentication itself is bypassed.

---

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

---

# Pass 04 — Secrets & Sensitive Data Exposure

## Objective
Find secrets and sensitive information that can escape to unintended readers.

## Inspect
- Hard-coded credentials, API keys, tokens, private keys, connection strings in source, tests, fixtures, scripts, sample files, Docker/CI/config files.
- Secrets, authorization headers, reset links/tokens, session material, or PII written to logs/telemetry.
- Error responses exposing stack traces, SQL, internal paths, environment values, debug metadata.
- API responses returning sensitive model fields callers do not require.
- Debug/admin endpoints, debug flags, development consoles, source maps, test routes.

## Report
For every finding include exact location, data type, how it leaves its trust boundary, and who can observe it. Distinguish real secrets from placeholders/examples.

---

# Pass 05 — Error Handling & Failure Paths

## Objective
Audit what happens when the last step of a multi-step operation fails after earlier steps succeeded.

## Inspect
- Empty or overly broad catch blocks.
- Errors logged and then execution continues with invalid/partial state.
- Multi-step writes with no rollback/compensation.
- Error flattening that prevents callers from distinguishing retryable, conflict, validation, authorization, and fatal failures.
- Early returns/exceptions that leak resources, retain locks, leave flags stuck, or skip cleanup.
- Background tasks whose exceptions are lost.

## Method
For each multi-step workflow, enumerate steps 1..N and explicitly simulate failure at N after 1..N-1 succeeded.

## Report
Name the exact broken state produced: duplicated data, orphan row/file, stale status, missing event, charged-but-unfulfilled action, lock/resource leak, etc.

---

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

---

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

---

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

---

# Pass 09 — Algorithmic Complexity & Hot Paths

## Objective
Find code that is acceptable on tiny demo data but degrades sharply at realistic scale.

## Method
Identify high-frequency handlers and paths processing the largest collections/files/payloads. For each, state a workload assumption such as `N items/request, M concurrent requests`.

## Inspect
- Nested iteration over unbounded inputs.
- Linear scans inside loops causing accidental O(n²) or worse.
- Recomputed invariants or repeated expensive parsing/serialization.
- Repeated regex/crypto/DOM/AST work that could be hoisted or cached safely.
- Full materialization where streaming/chunking is expected.

## Report
For every finding, name the scale at which it becomes harmful. Patterns that never encounter meaningful scale are `INFO/NIT`, not severe findings.

---

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

---

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

---

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

---

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

---

# Pass 14 — Configuration & Environment Hardening

## Objective
Audit configuration that can silently weaken production behavior.

## Inspect
- Debug/dev mode, permissive CORS, disabled TLS/certificate verification, exposed admin/metrics ports.
- Prod/dev differences that alter authentication, authorization, cookie, logging, storage, or network security.
- Config values trusted without startup validation.
- Feature flags that bypass security controls.
- Reused keys/secrets across environments where visible.
- Missing required values that fall back to insecure or nonsensical defaults instead of failing fast.

## Report
Organize by configuration source/file. Explicitly list environments or infrastructure layers you cannot inspect and keep conclusions about them `NEEDS-CONTEXT`.

---

# Pass 15 — Dependencies & Supply Chain

## Objective
Review manifests and lockfiles for unnecessary or high-risk dependency exposure without inventing live vulnerability intelligence.

## Inspect
- Declared packages apparently never imported/used.
- Multiple conflicting major versions across the resolved tree where visible.
- Suspicious package names/typosquat lookalikes.
- Install/postinstall/build scripts with code execution or downloads.
- Large dependency pulled for a trivial function.
- Auth, crypto, parser, deserializer, archive, image/document, template, and network packages on security-critical paths.
- Unpinned dependencies or automation actions where reproducibility matters.

## Report
Do not claim a CVE from memory. If live advisory data is unavailable, emit `NEEDS-CONTEXT` with the exact `package@version` to check. Separate maintainability concerns from demonstrated security findings.

---

# Pass 16 — Logging, Observability & Auditability

## Objective
Determine whether important production failures and security events can be reconstructed externally.

## Inspect
- Error logs with correlation/request/job identifiers and useful non-sensitive context.
- Appropriate log levels rather than everything INFO/ERROR.
- Audit trail for login failures, permission denials, sensitive/admin mutations, destructive actions, role changes, key configuration changes.
- Silent failures and swallowed background-task errors.
- Tight-loop/noisy logs and unbounded cardinality hazards.
- Cross-check pass 04 for secrets/PII in logs.

## Report
Prioritize the diagnostic blind spots that would make a serious incident non-reconstructable: what happened, to which resource, by whom, and in which request/job cannot be determined.

---

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

---

# Pass 18 — Cross-Module Contracts & Emergent Risks

## Objective
Ignore isolated single-file style issues. Audit assumptions that exist only at module/service boundaries.

## Coverage first
List boundaries where both producer and consumer are visible, and boundaries where only one side is visible. One-sided boundaries may produce only `NEEDS-CONTEXT`, never confirmed findings.

## Reconstruct the implicit contract
For each visible boundary determine:
- Who validates input?
- Who authorizes the action/object?
- Who owns retries and idempotency?
- Who owns the transaction/commit boundary?
- Who encodes/escapes/serializes?
- What invariants and ordering does each side assume?
- How are errors represented and propagated?

## Hunt
Responsibility gaps, duplicate retry/cache/encoding effects, invariant drift, throw-vs-result mismatch, ordering bugs, retry amplification, fan-out amplification, stale cache semantics, inconsistent timeout/cancellation ownership.

## Report
Every confirmed finding must name both sides and both locations.

---

# Pass 19 — Test Gaps & Validation Quality

## Objective
Map tests to risk rather than coverage percentage.

## Inspect
- Critical paths with no failure-path tests: auth, authorization, destructive data changes, money/value transfer, retries, transactions, external dependencies, and findings from earlier passes.
- Tests coupled to implementation details rather than externally observable behavior.
- Tests that only assert “does not throw” or lack meaningful state/result assertions.
- Shared mutable fixtures or order dependence.
- Missing concurrency, duplicate-delivery, timeout, cancellation, boundary-value, large-input, wrong-tenant/wrong-role, partial-failure, and rollback tests.

## Output
Produce a ranked **Top 10 missing tests** list. Each item must include the exact setup, action, and assertions that would catch the highest-impact plausible regression.

---

# Pass 20 — Verification & False-Positive Filter

## Objective
Adversarially verify all candidate findings from prior executed passes. This pass is always last.

## Hard rule
**You may not introduce new findings.** You may only relocate, confirm, merge, downgrade, reject, or leave unverified existing candidates.

## For each candidate
1. Relocate the cited code. If the evidence cannot be found and cannot be accurately relocated, mark `REJECTED` for citation mismatch.
2. Try to disprove the issue. Search for upstream/downstream validation, scoped queries, database constraints, locks, middleware, framework behavior, cleanup, idempotency controls, transactions, or tests that prevent the proposed failure.
3. If the defense exists and closes the path, mark `REJECTED` and cite the disproving location.
4. If deciding the issue depends on unseen code/config/schema/runtime behavior, mark `UNVERIFIED` and name the exact missing context.
5. Merge duplicates across passes and retain the clearest evidence-backed formulation.
6. Re-score severity conservatively. `CRITICAL` is allowed only when you can state a concrete reachable failure and material impact from visible evidence.

## Final output
Produce exactly:

### CONFIRMED
Severity-ordered, deduplicated, full finding contract.

### UNVERIFIED
Each with exact missing context required to decide it.

### REJECTED
One line each: `candidate ID — reason — disproving evidence/location`.

Then append coverage and the Top 10 missing tests from pass 19. Do not claim absolute security or production readiness.
