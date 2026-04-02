# Platform Round (Minimum Platforms)

- **Category:** Greedy two-pointer sweep  
- **Goal:** Find the minimum number of platforms so no train waits when arrivals and departures overlap.

## Approach

1. Sort arrivals and departures separately.  
2. Use two indices to walk through the sorted lists.  
3. When the next arrival occurs **before or at** the next departure, increment active trains.  
4. When a departure happens first, decrement active trains.  
5. Track the maximum active count across the sweep — that is the platform requirement.

This is equivalent to computing the maximum overlap among all intervals.

## Complexity

- Sorting: `O(n log n)`  
- Sweep: `O(n)`  
- Extra memory: `O(n)` for the sorted copies

## Usage

```js
const { minPlatformsNeeded } = require("./platform-round");

const arrivals = [540, 555, 600, 700];
const departures = [550, 715, 720, 730];

console.log(minPlatformsNeeded(arrivals, departures)); // 2
```

## Notes

- Inputs must be aligned (same length, index pairing).  
- Choose time representation appropriate for your domain (minutes, epoch, Date parsing).  
- For inclusive/exclusive departures, adjust the comparison: use `<` instead of `<=` if departures free a platform instantly.
