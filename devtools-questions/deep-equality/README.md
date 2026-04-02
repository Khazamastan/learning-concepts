# Deep Equality

## Problem
Compare two values to determine if they are deeply equal, handling nested
objects, arrays, and potential circular references without throwing.

## Solution
The `deepEqual` routine first checks `Object.is` for trivial matches, prunes
primitive mismatches, and then recurses across object keys. A `WeakMap` caches
already-visited nodes to short-circuit cycles. It enforces matching key counts
and structure, yielding a reliable deep comparison utility.

## Running locally
```
npm install
npm start
```
