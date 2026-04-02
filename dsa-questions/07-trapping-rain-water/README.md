# Trapping Rain Water

## Problem Overview
Given an array of non-negative integers representing bar heights, compute how much water can be trapped after raining. The width of each bar is 1.

## Approach
Maintain two pointers moving inward from both ends while keeping track of the maximum height seen on each side. Water trapped at any position depends on the shorter maximum boundary.

## Algorithm Steps
1. Initialize `left` and `right` pointers at the edges, and `leftMax`, `rightMax`, `water` to zero.
2. While `left <= right`:
   - If `height[left] <= height[right]`, update `leftMax` or add trapped water based on `leftMax`, then move `left`.
   - Otherwise, perform the symmetric operation for the right pointer.
3. Return `water`.

## Correctness
Water above a bar is limited by the shorter of the tallest bars on its left and right. The two-pointer method guarantees that when we process the shorter side, the opposite side already has a boundary tall enough to validate the trapped water computation.

## Complexity
- Time Complexity: `O(n)`
- Space Complexity: `O(1)`

## Example
Input: `height = [0,1,0,2,1,0,1,3,2,1,2,1]`
Output: `6`
