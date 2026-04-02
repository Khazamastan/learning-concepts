# Merge k Sorted Lists (Min-Heap)

## Problem Overview
Given `k` sorted linked lists, merge them into a single sorted list. This solution highlights the min-heap strategy.

## Approach
Push the head of each list into a min-heap ordered by node value. Repeatedly pop the smallest node, append it to the result, and push its successor into the heap. Continue until the heap is empty.

## Algorithm Steps
1. Initialize an empty min-heap that compares nodes by value.
2. Insert the head node of every non-empty list into the heap.
3. While the heap is not empty:
   - Pop the minimum node, append it to the merged list.
   - Push the popped node's `next` node to the heap if it exists.
4. Return the merged list starting after the dummy head.

## Correctness
At any point, the heap contains the smallest unprocessed node from each list. Extracting the minimum ensures nodes are appended in ascending order, producing a fully sorted result.

## Complexity
- Time Complexity: `O(N log k)` where `N` is the total number of nodes and `k` is the number of lists (heap operations cost `log k`).
- Space Complexity: `O(k)` for the heap.

## Example
Input: `[[1,4,5],[1,3,4],[2,6]]`
Output: `[1,1,2,3,4,4,5,6]`
