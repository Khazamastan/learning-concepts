# Object Reference Output

## Problem
Demonstrate how assigning one object to another variable in JavaScript copies
the reference, not the value, so mutations through either handle affect the same
object.

## Solution
The snippet creates `name` and assigns it to `nameCopy`, mutates a property via
the copy, and logs both objects. The shared reference means the original object
reflects the change, making the example handy for interview explanations or
training materials.

## Running locally
```
npm install
npm start
```
