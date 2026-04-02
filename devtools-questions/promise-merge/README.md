# Promise Merge

## Problem
Accept an object whose values may be promises and return a single promise that
resolves to an object of the fulfilled results, preserving the original keys.

## Solution
`promiseMerge` converts the object into `[key, value]` pairs, wraps each entry in
`Promise.resolve`, and waits for them together with `Promise.all`. It rebuilds an
object from the resolved values, maintaining key association even when entries
were immediately available.

## Running locally
```
npm install
npm start
```
