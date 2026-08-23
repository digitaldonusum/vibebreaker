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
