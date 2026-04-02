# 3Sum

## Problem Overview
Given an integer array `nums`, return all unique triplets `[nums[i], nums[j], nums[k]]` such that `i`, `j`, `k` are distinct and the numbers sum to zero.

## Approach
Sort the array and fix one element at a time. For each fixed element, use a two-pointer sweep to find complementary pairs that sum to the required opposite value while skipping duplicates.

## Algorithm Steps
1. Sort `nums` in ascending order.
2. For each index `i` (excluding the last two positions):
   - Skip duplicates so that the first element of the triplet is unique.
   - Use two pointers `left = i + 1` and `right = end`.
   - Compute the sum:
     - If zero, record the triplet and move both pointers while skipping duplicates.
     - If less than zero, increment `left`.
     - If greater than zero, decrement `right`.
3. Return the list of unique triplets.

## Correctness
Sorting allows duplicates to be skipped efficiently. The two-pointer scan covers all pairs for each anchor element without repetition, ensuring that all unique zero-sum triplets are collected while respecting the ordering constraint `i < left < right`.

## Complexity
- Time Complexity: `O(n^2)`
- Space Complexity: `O(1)` extra (excluding the output list).

## Example
Input: `nums = [-1, 0, 1, 2, -1, -4]`
Output: `[[-1, -1, 2], [-1, 0, 1]]`
