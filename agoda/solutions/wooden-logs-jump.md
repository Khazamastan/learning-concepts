# Wooden Logs Jump (1/2/3 Step DP)

- **Category:** Dynamic Programming  
- **Goal:** Count how many ways a hopper can reach log `n` when each move can jump 1, 2, or 3 logs ahead.

## Recurrence

Let `dp[i]` be the number of ways to land on log `i`.

```
dp[i] = dp[i-1] + dp[i-2] + dp[i-3]
```

Interpretation: the last hop could have come from the previous, second previous, or third previous log. The base cases align with a single starting position on log `0`:

- `dp[0] = 1` — standing start  
- `dp[1] = 1`  
- `dp[2] = 2`

## Implementation Highlights

- Iterative bottom-up loop from `2` to `n`.  
- Keep only the last three values (`O(1)` memory).  
- Throw when `n` is negative to surface invalid inputs early.

## Complexity

- Time: `O(n)`  
- Space: `O(1)` extra beyond the loop

## Usage

```js
const { countLogJumps } = require("./wooden-logs-jump");

console.log(countLogJumps(5)); // 13
console.log(countLogJumps(0)); // 1
```

## Variations

- Add obstacles by zeroing `dp[i]` when log `i` is broken.  
- Modulo arithmetic for large counts (e.g., `% 1_000_000_007`).  
- Track actual paths by storing predecessors if reconstruction is needed.
