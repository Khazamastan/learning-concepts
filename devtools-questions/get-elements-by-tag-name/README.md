# Get Elements By Tag Name

## Problem
Replicate `document.getElementsByTagName`, returning all descendant elements
whose tag name matches a requested selector. Useful for DOM exercises without
directly calling the built-in.

## Solution
The helper coerces the desired tag to lowercase and performs a depth-first
traversal. When a node's `tagName` matches, it is pushed into the results array.
Children are visited recursively, so the final output contains every matching
descendant in document order.

## Running locally
```
npm install
npm start
```
