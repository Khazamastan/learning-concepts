# Minimum Number of Planes That Can Be Shot Down

- **Category:** Greedy + Sorting  
- **Goal:** Fire the fewest anti-aircraft shots so every plane flying through an altitude segment is hit.

## Problem Model

Treat each plane's path as an inclusive altitude interval `[start, end]`. A single shot at altitude `h` destroys every plane whose interval contains `h`. We want the minimum number of distinct shot heights that hit all planes.

## Algorithm

1. Sort the intervals by their ending altitude ascending.  
2. Fire the first shot at the end of the earliest finishing interval.  
3. Skip every interval already covered by the current shot height.  
4. Whenever the next interval starts above the latest shot height, fire a new shot at that interval's end.

This is the classic *interval stabbing* or *min arrows to burst balloons* greedy proof: always choosing the earliest finishing interval leaves maximum space for remaining planes.

## Complexity

- Sorting: `O(n log n)`  
- Scan: `O(n)`  
- Extra memory: `O(1)` beyond the sort copy.

## Usage

```js
const { minimumShotsForPlanes } = require("./minimum-number-of-planes");

const planes = [
  [1, 6],
  [2, 8],
  [7, 12],
  [10, 16],
];

console.log(minimumShotsForPlanes(planes)); // 2
```

## Edge Cases

- Empty input → `0` shots.  
- Single plane → `1`.  
- Nesting intervals → still `1` shot at the innermost end.  
- Non-overlapping planes → equals number of planes.
