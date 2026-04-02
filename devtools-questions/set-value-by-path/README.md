# Set Value By Path

## Problem
Assign a value deep inside an object using a dotted path or array of keys,
creating intermediate objects as needed.

## Solution
`setByPath` splits the path into segments, walks the target reference, and
initialises missing levels to `{}`. When it reaches the last segment it writes
the provided value and returns the original object for convenience, enabling
fluid configuration updates.

## Running locally
```
npm install
npm start
```
