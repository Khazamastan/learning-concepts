# Maximum Subarray

## Problem Overview
Given an integer array `nums`, find the contiguous subarray with the largest sum and return that sum.

## Approach
Apply Kadane's algorithm, which maintains the best subarray ending at the current position and updates the global maximum as the array is scanned once.

## Algorithm Steps
1. Initialize `currentSum` and `bestSum` to the first element.
2. For each subsequent element, choose to either extend the existing subarray or start a new subarray at the current element.
3. Update the global best whenever `currentSum` exceeds `bestSum`.
4. Return `bestSum`.

## Correctness
At every index, the algorithm stores the optimal subarray ending at that index. Extending or restarting ensures that no better candidate is missed. The global maximum captures the best subarray encountered during the scan.

## Complexity
- Time Complexity: `O(n)`
- Space Complexity: `O(1)`

## Example
Input: `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`
Output: `6`
The optimal subarray is `[4, -1, 2, 1]`.
