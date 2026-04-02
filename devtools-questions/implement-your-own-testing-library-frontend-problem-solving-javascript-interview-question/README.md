# Implement your own testing library

## Problem

Build a tiny assertion library that follows the familiar Jest-like API: `test()` to define a unit, `expect()` with matchers, async support, and a summary report. The goal is to understand the moving parts (registration, execution, reporting) instead of relying on an off-the-shelf framework.

## Solution

`src/index.js` exports two primitives:

- `test(name, fn, timeout)` queues a function, executes it (sync or async), records the result, and enforces a per-test timeout.
- `expect(actual)` returns matchers (`toBe`, `toEqual`, `toThrow`). Each matcher throws when the assertion fails; the test wrapper catches the error and marks the test as failed.

A simple `deepEqual` helper handles nested comparisons without pulling in dependencies. When every test settles, `report()` prints a concise summary with timing information.

The file ends with four demo tests to illustrate the API. Extend it by adding more matchers (e.g., `toBeTruthy`) or richer reporters.

## Running locally

```bash
cd implement-your-own-testing-library-frontend-problem-solving-javascript-interview-question
node src/index.js
```

The console output shows each test result followed by an aggregated summary.
