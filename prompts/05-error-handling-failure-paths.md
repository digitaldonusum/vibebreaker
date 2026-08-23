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
