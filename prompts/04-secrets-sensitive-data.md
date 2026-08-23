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
