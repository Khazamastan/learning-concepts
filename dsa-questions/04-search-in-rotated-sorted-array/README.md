# Search in Rotated Sorted Array

## Problem Overview
Given a rotated sorted array and a target value, return the index of the target or `-1` if it does not exist. The algorithm must run in `O(log n)` time.

## Approach
Adapt binary search by determining which side of the current midpoint is sorted. Depending on where the target falls, narrow the search to the sorted half that could contain the target.

## Algorithm Steps
1. Initialize `left` and `right` pointers at the start and end of the array.
2. While `left <= right`, compute `mid`.
3. If `nums[mid]` is the target, return `mid`.
4. If the left half is sorted, check if the target lies between `nums[left]` and `nums[mid]`; adjust the search bounds accordingly.
5. Otherwise, the right half is sorted; check if the target lies between `nums[mid]` and `nums[right]`; adjust the bounds.
6. If the loop ends without finding the target, return `-1`.

## Correctness
In each iteration at least one half of the array remains sorted despite rotation. By checking where the target could be located relative to this sorted half, the algorithm guarantees that the search interval shrinks toward the correct index, preserving binary search efficiency.

## Complexity
- Time Complexity: `O(log n)`
- Space Complexity: `O(1)`

## Example
Input: `nums = [4, 5, 6, 7, 0, 1, 2]`, `target = 0`
Output: `4`
