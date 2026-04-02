# Feature Flag Service

## Problem
Implement a lightweight feature flag client that can enable or disable features
per environment, optionally roll them out to a percentage of users, and gate on
custom segment checks.

## Solution
`FeatureFlagClient` stores flag definitions internally and exposes methods to
update or remove them. `isEnabled` short-circuits when a flag is missing or
disabled, evaluates optional segment predicates against the provided context,
and uses a hash bucket (via SHA-256) to determine if the user falls inside the
rollout percentage. Normalising the rollout ensures safe bounds between 0 and 1.

## Running locally
```
npm install
npm start
```
