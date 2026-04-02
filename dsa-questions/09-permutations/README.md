# Permutations

## Problem Overview
Given an array of distinct integers, return all possible permutations.

## Approach
Use backtracking to build permutations by choosing unused numbers one position at a time. After exploring a choice, undo it before trying the next candidate.

## Algorithm Steps
1. Maintain a `current` array representing the permutation being built and a `used` array marking which indices are already included.
2. If `current` has the same length as `nums`, record a copy in the result list.
3. Otherwise, iterate over indices:
   - Skip indices already used.
   - Choose the candidate, mark it used, recurse, then unmark and remove it.
4. Return the accumulated permutations.

## Correctness
Backtracking ensures every permutation is formed exactly once. Because the numbers are distinct and each position eventually selects one unused number, permutations are complete and duplicate-free.

## Complexity
- Time Complexity: `O(n * n!)` due to generating all permutations and copying them.
- Space Complexity: `O(n)` excluding the output, for recursion stack and tracking arrays.

## Example
Input: `nums = [1, 2, 3]`
Output: `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`
