# Property access increment

## Problem

Given an object and a dot-separated path, increment the numeric value at that path (creating intermediate objects and defaulting to zero when necessary).

## Solution

`incrementPath(target, path, step)` splits the path, walks down the object creating empty objects when keys are missing, then increments the leaf by `step`. Non-object segments throw to avoid clobbering primitives.

## Running locally

```bash
cd how-do-you-implement-the-following-code-snippet-property-access-increment
node src/index.js
```

The sample produces `{ user: { visits: 8, likes: 2 } }`.
