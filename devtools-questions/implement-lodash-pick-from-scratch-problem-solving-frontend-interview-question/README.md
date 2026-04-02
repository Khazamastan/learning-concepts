# Implement `lodash.pick` from Scratch

## Problem
Create a `pick` utility that accepts an object and an array of dot-separated
paths, returning a new object containing only the selected properties. Nested
paths should be supported, and missing paths should be ignored gracefully.

## Solution
The `pick` function loops over requested paths, splits them into segments, and
walks the source object. When all segments exist, it reconstructs the same path
shape inside the result object. The demo extracts a user’s name, city, and roles
from a nested structure to mirror Lodash’s `pick` behaviour.

## Running locally
```
npm install
npm start
```
