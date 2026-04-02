# Implement a DOM-like Structure Tree

## Problem
Create a lightweight virtual DOM utility that mimics a subset of the browser
DOM API: `createElement`, `appendChild`, and `render()` which returns a formatted
HTML string. The tree should support nested nodes and simple text content via
`innerHTML`.

## Solution
`VDocument` keeps a virtual root node and allows callers to create additional
`VNode` instances. Appending children maintains parent references so rendering
can walk the tree recursively. `render()` produces a neatly indented HTML string.
The demo recreates the interview snippet, resulting in the expected `<html><body><div>…`
structure.

## Running locally
```
npm install
npm start
```
