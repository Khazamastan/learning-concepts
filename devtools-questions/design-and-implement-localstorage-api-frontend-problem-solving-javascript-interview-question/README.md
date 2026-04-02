# Design and Implement a `localStorage` API

## Problem
Build a storage abstraction that mirrors the browser `localStorage` contract:
string keys and values, `getItem`, `setItem`, `removeItem`, `clear`, `length`,
and the `key(index)` getter. The solution should be usable in non-browser
contexts for tests or server-side rendering.

## Solution
`MemoryStorage` wraps a `Map` and normalises values to strings on write. The
class enforces string keys, exposes the required methods, and derives `length`
from the backing store. The module exports both the class and a `storage`
instance that falls back to the in-memory implementation if `window.localStorage`
is unavailable. The sample script exercises the API by setting, reading,
removing, and clearing keys.

## Running locally
```
npm install
npm start
```
