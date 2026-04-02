# Top K Frequent Elements

## Problem Overview
Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. The order of the result can be arbitrary.

## Approach
Count the frequency of each number using a hash map. Place numbers into buckets indexed by frequency, then collect elements from highest frequency to lowest until `k` elements are gathered.

## Algorithm Steps
1. Build a frequency map where keys are numbers and values are counts.
2. Create an array of buckets from `0` to `n` (`n` is the length of `nums`), each bucket storing the numbers with the corresponding frequency.
3. Iterate buckets in descending frequency order, collecting numbers until `k` elements have been added to the result.
4. Return the collected elements.

## Correctness
Every element appears in exactly one bucket corresponding to its frequency. Traversing buckets from high to low guarantees the first `k` collected entries are the most frequent ones.

## Complexity
- Time Complexity: `O(n)` expected, where `n` is the length of `nums`, because counting and bucket traversal are linear.
- Space Complexity: `O(n)` for the frequency map and bucket structure.

## Example
Input: `nums = [1,1,1,2,2,3]`, `k = 2`
Output: `[1,2]`
