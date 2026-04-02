# Merge k Sorted Lists (Divide and Conquer)

## Problem Overview
Given `k` linked lists sorted in ascending order, merge them into a single sorted linked list.

## Approach
Pairwise merge the lists using a divide-and-conquer strategy. Merge lists in pairs, doubling the merged run size each pass until only one list remains.

## Algorithm Steps
1. If no lists are provided, return `null`.
2. Set `interval = 1`.
3. While `interval < k`:
   - For indices `i = 0, 2*interval, 4*interval, ...`, merge `lists[i]` with `lists[i + interval]`.
   - Store the merged list back at `lists[i]`.
   - Double `interval`.
4. Return `lists[0]`.

## Correctness
Each pass merges adjacent runs while preserving order. Because merging two sorted lists yields a sorted list, the repeated pairwise merges ultimately produce one fully sorted list containing all nodes.

## Complexity
- Time Complexity: `O(N log k)` where `N` is the total number of nodes and `k` is the number of lists.
- Space Complexity: `O(1)` auxiliary space since merging is done in place (not counting recursion).

## Example
Input: `[[1,4,5],[1,3,4],[2,6]]`
Output: `[1,1,2,3,4,4,5,6]`
