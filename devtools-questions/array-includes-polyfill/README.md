# Array `includes` Polyfill

## Problem
Recreate `Array.prototype.includes`, which checks whether an array contains a
given element. The polyfill must honour negative `fromIndex` values and treat
`NaN` as matching itself.

## Solution
`includesPolyfill` normalises `fromIndex`, walks the array from that point
forward, and compares values using `Object.is` so `NaN` is handled correctly.
The demonstration registers `myIncludes` and tests standard lookups plus the
`NaN` edge case and a start-offset example.

## Running locally
```
npm install
npm start
```
