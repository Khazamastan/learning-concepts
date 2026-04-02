# Read a Field Inside a Nested Object

## Problem
Implement a safe getter utility that returns the value at a dot-separated path
within an object. If any part of the path is missing, the helper should return a
supplied default value (or `undefined`).

## Solution
`readField` splits the path into segments, iteratively walks the object, and
short-circuits when it encounters `undefined`. If the entire path exists it
returns the final value; otherwise the default is returned. The usage example
reads nested notification settings while safely handling absent keys.

## Running locally
```
npm install
npm start
```
