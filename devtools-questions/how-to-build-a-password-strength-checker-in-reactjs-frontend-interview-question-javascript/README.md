# Password Strength Checker

## Problem

Provide instant feedback on password quality while the user types. Requirements include a strength meter, checklist of criteria, and clear messaging about improvements.

## Solution

`PasswordStrengthChecker` stores the current password and computes a score with `evaluate(password)`, which applies six tests (length, uppercase, lowercase, numbers, symbols, and common pattern avoidance). The number of passed checks maps to a strength label and tone. A horizontal meter visualises progress, and a checklist lists remaining fixes.

## Running locally

```bash
cd how-to-build-a-password-strength-checker-in-reactjs-frontend-interview-question-javascript
npm install
npm run dev
```

Open the Vite dev server (default `http://localhost:5173`) and experiment with different passwords.
