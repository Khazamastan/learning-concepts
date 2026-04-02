# String To Object

## Problem
Parse a configuration string like `foo.bar=1&baz=true` into a nested JavaScript
object, handling dotted paths, multiple declarations, and basic type coercion.

## Solution
`stringToObject` splits the input on newlines, ampersands, or semicolons,
ignores empty lines, and divides each pair at `=`. Values pass through a small
parser that converts booleans and numbers. A helper writes each value to the
correct nested location, creating intermediary objects along the way.

## Running locally
```
npm install
npm start
```
