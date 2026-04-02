# Count By

## Problem
Group a collection by a derived key and count the number of occurrences per
group. The caller supplies an iteratee that maps each item to the bucket key.

## Solution
`countBy` validates that an iteratee function was provided and runs a `reduce`
over the collection. Each iteration increments the counter for the computed key
using nullish coalescing to handle first sightings. The result is a plain object
that records counts per bucket.

## Running locally
```
npm install
npm start
```
