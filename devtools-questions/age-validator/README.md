# Age Validator

## Problem
Implement a lightweight age gate that accepts a user's age, validates that the
input is a whole number, blocks values outside an allowed range, and provides
accessible feedback. On valid submission the flow should acknowledge success;
otherwise the user should see the precise rule they violated.

## Solution
This Vite + React widget keeps the raw input value in component state and runs
all validation through a `validateAge` helper backed by memoisation. The helper
returns typed results (error or success) so the form can surface the right copy
and ARIA attributes without extra branching. Numeric checks use a simple
regular expression before coercing to a number, and range constraints are
centralised through `MIN_AGE` / `MAX_AGE` constants. Submitting with a valid
age triggers a confirmation alert; invalid attempts reset the helper text while
keeping focus on the field for rapid correction.

## Running locally
```
npm install
npm run dev
```
