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
