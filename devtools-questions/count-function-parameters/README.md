# Count Function Parameters

## Problem
Determine how many positional parameters a function expects so introspection
tools can adapt their behaviour before invoking it.

## Solution
The `countFunctionParameters` helper simply validates it received a function and
returns the built-in `length` metadata, which reflects the number of declared
parameters before any rest arguments. This mirrors how libraries such as Lodash
inspect signatures.

## Running locally
```
npm install
npm start
```
