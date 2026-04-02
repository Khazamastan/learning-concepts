# Get Elements By Class Name

## Problem
Mirror the behaviour of `document.getElementsByClassName` using recursive DOM
traversal so the helper works in environments without the native API or for
educational purposes.

## Solution
`getElementsByClassName` normalises the class name, walks the DOM tree depth
first, and tracks matches in an array. Each node's `className` is split into a
set for quick containment checks, and children are visited via recursion. The
original DOM nodes are returned, matching the platform API.

## Running locally
```
npm install
npm start
```
