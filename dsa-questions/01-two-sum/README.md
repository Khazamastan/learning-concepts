# Two Sum

## Problem Overview
Given an integer array `nums` and an integer `target`, identify the indices of the two numbers that add up to the target. Each input has exactly one solution, and the same element cannot be used twice.

## Approach
Use a hash map to track values we have seen and their indices as we iterate through the array once. For each number, calculate the complement (`target - currentValue`). If the complement has already been stored, we found the pair and can return the stored index alongside the current index.

## Algorithm Steps
1. Initialize an empty `Map` to store numbers and their indices.
2. Iterate through `nums` with index `i`.
3. Compute the complement `target - nums[i]`.
4. If the complement is already in the map, return the stored index and `i`.
5. Otherwise, store `nums[i]` with index `i` in the map.
6. If no pair is found (theoretically impossible per constraints), return an empty array.

## Correctness
The map ensures that each value's complement is checked against previously seen values only. Because each element is considered once, as soon as a complement is discovered, returning the indices satisfies the requirement without reusing elements.

## Complexity
- Time Complexity: `O(n)` because each element is processed at most once.
- Space Complexity: `O(n)` for the map storing seen elements.

## Example
Input: `nums = [2, 7, 11, 15]`, `target = 9`
Output: `[0, 1]`
We store `2 -> 0`, encounter `7`, find `9 - 7 = 2` already stored, and return `[0, 1]`.
