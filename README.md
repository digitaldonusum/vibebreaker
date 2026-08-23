<p align="center">
  <img src="assets/vibebreaker-hero.svg" alt="VibeBreaker — Your AI said it works. Make it prove it." width="100%" />
</p>

<p align="center">
  <strong>20 adversarial passes between “it works” and “ship it.”</strong><br/>
  Security · Correctness · Reliability · Scale
</p>

<p align="center">
  <a href="README.md">English</a> ·
  <a href="README.tr.md">Türkçe</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vibebreaker"><img src="https://img.shields.io/npm/v/vibebreaker?label=npm&color=111111" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/vibebreaker"><img src="https://img.shields.io/npm/dm/vibebreaker?color=111111" alt="npm downloads" /></a>
  <a href="https://github.com/digitaldonusum/vibebreaker/stargazers"><img src="https://img.shields.io/github/stars/digitaldonusum/vibebreaker?style=flat&color=111111" alt="GitHub stars" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-111111" alt="MIT License" /></a>
  <img src="assets/20-pass-badge.svg" alt="20-pass protocol" />
</p>

<p align="center">
  <strong>Your AI said “it works.” Make it prove it.</strong>
</p>

<p align="center">
  VibeBreaker is an agent-agnostic, evidence-first audit protocol for AI/vibe-coded software.<br/>
  It attacks a repository from 20 different failure angles, then uses a final adversarial verifier to reject false positives.
</p>

---

## ⚡ One command to start

```bash
npx vibebreaker init
```

<p align="center">
  <strong>20 passes. One verifier. No vibes. Evidence.</strong>
</p>

### Quick start

```bash
npx vibebreaker init
npx vibebreaker doctor
npx vibebreaker prompt
```

| Command | What it does |
|---|---|
| `init` | Creates a local `.vibebreaker/` workspace with the protocol, all 20 passes, templates and agent prompt |
| `doctor` | Verifies that the local audit workspace is complete |
| `prompt` | Prints the exact instruction to give your coding agent |

> **Private by design:** VibeBreaker does not silently choose a model or send your source code to a third-party API. The audit remains agent-agnostic.

---

## From “it works” to evidence

| 01 — Attack | 02 — Verify | 03 — Decide |
|---|---|---|
| Run 19 focused passes across security, reliability, data and scale. | Pass 20 tries to **disprove** every candidate finding. | Only evidence-backed findings survive into the final verdict. |
| Find injection, IDOR, races, N+1, leaks, retry bugs and more. | Missing evidence is rejected or kept `UNVERIFIED`. | `BROKEN`, `FIX BEFORE SHIP`, `SURVIVED*` or `20/20 CLEAN`. |

```mermaid
flowchart LR
    A[AI says<br/>"it works"] --> B[Passes 01–19<br/>attack the repo]
    B --> C[Pass 20<br/>adversarial verifier]
    C --> D{Evidence survives?}
    D -->|Yes| E[CONFIRMED]
    D -->|Need context| F[UNVERIFIED]
    D -->|No| G[REJECTED]
    E --> H[Final verdict]
    F --> H
    G --> H
```

---

## The 20-Pass Protocol

| | | | |
|---|---|---|---|
| **01** Injection | **02** Authentication | **03** Authorization / IDOR | **04** Secrets |
| **05** Failure Paths | **06** Race Conditions | **07** Resource Leaks | **08** N+1 / Data Access |
| **09** Complexity | **10** Memory Growth | **11** Timeouts / Resilience | **12** Idempotency |
| **13** Transactions | **14** Config Hardening | **15** Supply Chain | **16** Observability |
| **17** API Contracts | **18** Cross-Module Risk | **19** Test Gaps | **20** Adversarial Verification |

<details>
<summary><strong>See what every pass hunts</strong></summary>

| # | Pass | Failure class |
|---:|---|---|
| 01 | Injection & Untrusted Input | Unsafe paths from external input to dangerous sinks |
| 02 | Authentication & Sessions | Identity establishment, rotation, recovery, invalidation |
| 03 | Authorization & IDOR | Missing ownership, tenant, role, object-level enforcement |
| 04 | Secrets & Sensitive Data | Credential, PII, debug and response leakage |
| 05 | Failure Paths | Partial writes, swallowed errors, missing compensation |
| 06 | Concurrency & Races | Check-then-act and non-atomic state transitions |
| 07 | Resource Lifecycle | Connections, files, locks, timers, listeners and leaks |
| 08 | Data Access & N+1 | Query fan-out, unbounded reads, avoidable in-memory work |
| 09 | Complexity & Hot Paths | Accidental O(n²), repeated expensive work, scale cliffs |
| 10 | Memory Growth | Unbounded caches, queues, retained graphs and datasets |
| 11 | Timeouts & Resilience | External calls, retry policy, backoff, failure behavior |
| 12 | Idempotency | Duplicate delivery, double effects, retry safety |
| 13 | Consistency Boundaries | Transactions, outbox/saga/compensation, split-brain state |
| 14 | Config Hardening | Dangerous defaults and environment drift |
| 15 | Supply Chain | Dependency exposure and install-time risk |
| 16 | Observability | Diagnostic blind spots and missing audit trails |
| 17 | API Contracts | Inconsistent errors, pagination, nullability and semantics |
| 18 | Cross-Module Contracts | Responsibility gaps and emergent interaction failures |
| 19 | Test Gaps | Missing high-damage scenarios and weak assertions |
| 20 | Adversarial Verification | Relocate, disprove, dedupe and conservatively re-score |

</details>

---

## Pass 20 is the difference

Most AI audits are good at producing *possible* problems. VibeBreaker is designed to make unsupported claims expensive.

Pass 20 receives every candidate finding and is explicitly told to:

- **add no new findings**
- relocate every cited code path
- search for existing guards, constraints, policies, transactions and framework behavior that disprove the issue
- merge duplicate findings from different passes
- keep unseen-code dependencies `UNVERIFIED`
- reserve `CRITICAL` for concrete, reachable and materially damaging failures

The final output has only three finding states:

| Status | Meaning |
|---|---|
| `CONFIRMED` | Evidence survived adversarial verification |
| `UNVERIFIED` | More code, config or runtime context is required |
| `REJECTED` | The candidate was disproved, duplicated or unsupported |

---

## Final verdict

| Verdict | Rule |
|---|---|
| 🔴 `BROKEN` | At least one confirmed `CRITICAL` |
| 🟠 `FIX BEFORE SHIP` | No criticals, but at least one confirmed `HIGH` |
| 🟡 `SURVIVED*` | No critical/high; lower-severity or unresolved findings remain |
| 🟢 `20/20 CLEAN` | FULL audit, zero confirmed, zero unverified, no material scope limitation |

<p align="center">
  <img src="assets/result-card-template.png" alt="VibeBreaker result card example" width="720" />
</p>

> A `20/20 CLEAN` result does **not** mean “secure forever.” It means no finding survived the protocol within the inspected code and available context.

---

## The 20/20 Challenge

Think your vibe-coded app is ready to ship?

Run all 20 passes. Let Pass 20 try to tear the findings apart.

**20/20 clean? Prove it.**

- Share your result card
- Open a [`20/20 Challenge` issue](.github/ISSUE_TEMPLATE/share-result.yml)
- Tag the project when you share your result

---

## Audit modes

| Mode | Passes | Best for |
|---|---|---|
| `FULL` | 01–20 | First launch, major release, serious review |
| `QUICK` | 01, 02, 03, 04, 11, 12, 13, 19, 20 | Fast pre-deploy review |
| `DIFF` | Applicable passes + 20 | Pull requests and agent-generated changes |
| `FOCUS:<area>` | Selected passes + 20 | Auth, data, performance, resilience, etc. |

---

## Evidence contract

Every candidate finding must name the exact code location, failure path and verification method. No `file:line`, no confident claim.

<details>
<summary><strong>Example finding</strong></summary>

```yaml
id: P03-F02
pass: "03"
title: Cross-tenant project access
status: CANDIDATE
severity: HIGH
confidence: HIGH
location:
  - path: src/api/projects/[id]/route.ts
    line: 47-62
entry_or_trigger: GET /api/projects/:id
evidence: Project is fetched using only a caller-supplied object id.
existing_controls_checked: Authentication exists; no owner or tenant scope was found.
failure_scenario: User A supplies User B's project id and receives B's project.
impact: Cross-tenant data disclosure.
remediation_direction: Scope the lookup to the authenticated principal/tenant.
verification: Request another tenant's project id and assert 403/404.
needs_context: null
```

</details>

---

## Run it manually

<details>
<summary><strong>Don't want the CLI?</strong></summary>

Give your coding agent the VibeBreaker repository or copy the protocol files into the project, then instruct it:

```text
Run the full VibeBreaker 20-Pass Protocol defined in AUDIT_PROTOCOL.md.
Stay read-only. Execute passes 01 through 20 in order.
Write raw pass results under .vibebreaker/raw/ and the final report to .vibebreaker/FINAL_REPORT.md.
Do not fix anything until the final report is complete.
Pass 20 is the adversarial verifier and is the only pass allowed to finalize finding status.
```

Works with any coding agent that can inspect a repository and follow Markdown instructions.

</details>

---

## Recommended workflow

```text
BUILD
  ↓
VIBEBREAKER AUDIT     ← read-only
  ↓
PASS 20 VERIFICATION
  ↓
FINAL REPORT
  ↓
FIX PLAN
  ↓
FIX
  ↓
RE-RUN RELEVANT PASSES
```

**Review first. Repair second.** Do not let the auditing agent silently patch code while it is still gathering evidence.

---

## What VibeBreaker is not

VibeBreaker is **not** a replacement for SAST/SCA/DAST, a professional pentest, load testing or production monitoring. It is a disciplined white-box review protocol for coding agents.

Only audit software you own or are authorized to review.

---

<details>
<summary><strong>Repository map</strong></summary>

```text
vibebreaker/
├── bin/                     # CLI entrypoint
├── src/                     # CLI implementation
├── test/                    # Node tests
├── README.md
├── README.tr.md
├── AGENTS.md
├── AUDIT_PROTOCOL.md
├── PROMPT_PACK.md
├── BRAND.md
├── CHALLENGE.md
├── prompts/                 # 20 focused passes
├── templates/               # finding + final report contracts
├── assets/                  # hero, badge, result-card assets
└── .github/ISSUE_TEMPLATE/  # community result sharing
```

</details>

## Contributing

The best contribution is a failure class that produces a real production bug and can be expressed as an evidence-backed audit rule without inflating false positives. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

MIT

---

<p align="center">
  <strong>Your AI said “it works.” Make it prove it.</strong><br/>
  <sub>If VibeBreaker finds the first thing your AI missed, consider starring the repo.</sub>
</p>
