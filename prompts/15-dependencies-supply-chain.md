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
