# Invert Object

## Problem
Swap the keys and values of a flat object so lookups can be performed by the
original values. Later stages should be able to convert `{a: 'x'}` into
`{'x': 'a'}` quickly.

## Solution
The `invertObject` helper reduces the object's keys, assigning the original
value as the new key and the original key as the value. It returns a brand new
object, leaving the source untouched.

## Running locally
```
npm install
npm start
```
