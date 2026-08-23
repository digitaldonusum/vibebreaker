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
