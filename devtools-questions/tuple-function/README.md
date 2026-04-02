# Tuple Function

## Problem
Capture a list of arguments and return an immutable tuple-like array so the
contents cannot be modified after creation.

## Solution
The `tuple` helper simply spreads the arguments into a new array and freezes it
with `Object.freeze`, preventing further mutations. This lightweight approach
matches common interview expectations for tuple utilities.

## Running locally
```
npm install
npm start
```
