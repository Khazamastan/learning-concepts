# Clone Deep

## Problem
Produce a deep copy of an object or array so mutations on the clone never affect
the source. The helper should gracefully handle circular references.

## Solution
`cloneDeep` performs a recursive walk, creating either an array or plain object
for each node. A `WeakMap` cache stores already-visited objects; encountering the
same reference again returns the cached clone, breaking cycles. Primitive values
are returned directly, yielding a faithful deep clone for typical JSON-like data.

## Running locally
```
npm install
npm start
```
