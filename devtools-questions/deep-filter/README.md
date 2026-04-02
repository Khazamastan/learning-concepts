# Deep Filter

## Problem
Recursively filter nested arrays and objects using a predicate, returning a
structure that only contains items matching the predicate somewhere within their
subtree.

## Solution
`deepFilter` walks arrays by mapping and filtering their children, and it
rebuilds objects with `Object.entries`, discarding keys whose values collapse to
`undefined`. Leaf values run through the predicate directly. The function returns
`undefined` when no branch survives, making it easy to prune entire subtrees.

## Running locally
```
npm install
npm start
```
