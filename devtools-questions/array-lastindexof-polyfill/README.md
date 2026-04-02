# Array `lastIndexOf` Polyfill

## Problem
Recreate `Array.prototype.lastIndexOf`, returning the last index at which a
given element appears or `-1` when absent. The implementation should understand
optional starting indices and negative offsets.

## Solution
`lastIndexOfPolyfill` converts the receiver to an object, normalises the
starting index (defaulting to the array’s end), and iterates backwards until it
finds a match or reaches index zero. The demo attaches the polyfill as
`myLastIndexOf` and performs a couple of lookups to prove the behaviour.

## Running locally
```
npm install
npm start
```
