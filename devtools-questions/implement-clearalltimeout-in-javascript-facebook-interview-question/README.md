# clearAllTimeout implementation

## Problem

Provide a helper that cancels every pending timeout created through a wrapper API.

## Solution

`setTrackedTimeout` stores timeout ids in a `Set`. `clearTrackedTimeout` removes a single id, while `clearAllTimeout` iterates through the set, clearing each id and finally emptying the set. This mirrors how many libraries (e.g., React Testing Library) implement cleanup utilities.

## Running locally

```bash
cd implement-clearalltimeout-in-javascript-facebook-interview-question
node src/index.js
```
