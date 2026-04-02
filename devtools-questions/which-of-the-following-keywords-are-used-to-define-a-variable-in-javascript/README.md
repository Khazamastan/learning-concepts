# Which Keywords Define Variables in JavaScript?

## Problem
Clarify which language keywords can introduce a new variable in JavaScript and
illustrate the behavioural differences between them.

## Solution
The script declares one binding with each keyword—`var`, `let`, and `const`—and
logs explanatory text. It then redeclares the `var`, reassigns the `let`, and
wraps a `const` reassignment attempt in a `try/catch` block to show that it
throws. The output makes the scoping and mutability rules for each keyword easy
to verify.

## Running locally
```
npm install
npm start
```
