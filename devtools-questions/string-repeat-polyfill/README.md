# String Repeat Polyfill

## Problem
Emulate `String.prototype.repeat`, repeating a string `count` times while
throwing on negative counts.

## Solution
`stringRepeat` uses a doubling strategy: it appends the pattern to itself while
halving the remaining count, adding the pattern to the result whenever the bit
is set. This logarithmic approach mirrors the spec algorithm and avoids
concatenating one character at a time.

## Running locally
```
npm install
npm start
```
