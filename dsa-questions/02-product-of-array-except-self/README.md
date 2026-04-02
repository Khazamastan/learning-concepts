# Product of Array Except Self

## Problem Overview
Given an integer array `nums`, build an array `answer` where `answer[i]` equals the product of all elements in `nums` except `nums[i]`. Division is not allowed and the algorithm must run in linear time.

## Approach
Use two passes to accumulate prefix and suffix products. The first pass stores the product of all numbers to the left of each index. The second pass multiplies the stored prefix values by the product of all numbers to the right of each index.

## Algorithm Steps
1. Create a `result` array filled with `1`.
2. Traverse from left to right while maintaining `prefixProduct`; store it at each position, then update the prefix by multiplying with the current value.
3. Traverse from right to left while maintaining `suffixProduct`; multiply the stored value at each index by the suffix, then update the suffix.
4. Return `result`.

## Correctness
Every index receives the product of elements before it (prefix) and after it (suffix). Because multiplication is associative, combining these two running products yields the desired product for each index without using division.

## Complexity
- Time Complexity: `O(n)` for two linear passes.
- Space Complexity: `O(1)` extra beyond the output array, which does not count as auxiliary space.

## Example
Input: `nums = [1, 2, 3, 4]`
Output: `[24, 12, 8, 6]`
Prefix products `[1, 1, 2, 6]` and suffix products `[24, 12, 4, 1]` combine to form the answer.
