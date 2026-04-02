# Array `pop` Polyfill

## Problem
Recreate the behaviour of `Array.prototype.pop`, removing the last element from
an array, reducing its length, and returning the removed value. When the array
is empty the method should return `undefined`.

## Solution
`popPolyfill` computes the final index, reads the value, deletes the property,
and then shortens the array by setting `length`. The demonstration script
attaches the polyfill as `myPop`, shows it working on a populated array, and
confirms that empty arrays yield `undefined`.

## Running locally
```
npm install
npm start
```
