# Contributing to VibeBreaker

Contributions should make the protocol more useful without turning it into a false-positive generator.

## Good contributions

- A recurring production failure class not already covered.
- A sharper evidence requirement for an existing pass.
- A false-positive rejection rule based on real framework/runtime behavior.
- Better cross-language wording that stays agent-agnostic.
- Fixtures or examples that demonstrate a failure deterministically.

## Pull request standard

Explain:

1. The failure class.
2. A concrete bad state it can cause.
3. What evidence an agent must locate before reporting it.
4. Common defenses that should cause rejection.
5. Which pass should own the rule.

Do not add a new pass simply to increase the number. `20` is part of the protocol identity; new ideas should normally improve an existing pass.
