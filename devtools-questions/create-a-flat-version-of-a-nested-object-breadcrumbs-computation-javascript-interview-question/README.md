# Flatten nested object (breadcrumbs)

## Problem

Turn a deeply nested configuration object into a flat dictionary keyed by dot-separated paths (useful for breadcrumbs, translations, etc.).

## Solution

`flattenObject` recursively walks the object. For each key it builds a `prefix.key` path. Plain objects recurse; primitives and arrays are assigned directly. The result is a single-level object whose keys describe the path. The sample prints flattened output for a navigation config.

## Running locally

```bash
cd create-a-flat-version-of-a-nested-object-breadcrumbs-computation-javascript-interview-question
node src/index.js
```
