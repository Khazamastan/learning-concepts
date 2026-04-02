# Array Is Array

## Problem
Polyfill `Array.isArray` so environments without the built-in helper can detect
array values. The function should correctly classify array instances and return
false for other objects.

## Solution
The implementation delegates to `Object.prototype.toString`, comparing the tag
string against `[object Array]`. This approach matches the ECMAScript spec and
provides a reliable type guard without depending on `instanceof`, which can
fail across realms.

## Running locally
```
npm install
npm start
```
