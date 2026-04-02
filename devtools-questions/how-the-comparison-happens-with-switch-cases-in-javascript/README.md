# How the Comparison Happens with `switch` in JavaScript?

## Problem
Explain why `switch` statements in JavaScript only match a `case` when both the
value **and** the type line up, even if two candidates look similar (for
example, `1` and `"1"`). Provide a quick executable demonstration that makes the
behaviour obvious.

## Solution
The sample script evaluates a few candidate values against two `case` clauses:
one numeric and one string. Because the language uses strict equality (`===`)
when performing `switch` comparisons, each input only matches the branch with
the same type. Values such as `true` or `0` fall through to the `default` block.
Running the snippet prints the outcome for each candidate so the rule is clear.

## Running locally
```
npm install
npm start
```
