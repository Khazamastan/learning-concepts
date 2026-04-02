# Reverse Linked List

## Problem Overview
Given the head of a singly linked list, reverse the list and return the new head.

## Approach
Iterate through the list while rewiring each node's `next` pointer to point to the previous node. Maintain references to the previous node and the current node.

## Algorithm Steps
1. Initialize `prev` to `null` and `current` to `head`.
2. While `current` is not `null`:
   - Store `current.next` in `nextNode`.
   - Reassign `current.next` to `prev`.
   - Move `prev` to `current` and `current` to `nextNode`.
3. When the loop ends, `prev` points to the new head.

## Correctness
Each pointer reversal preserves the nodes and simply flips the direction of traversal. Because we process every node exactly once, the final `prev` pointer references the reversed list's head.

## Complexity
- Time Complexity: `O(n)`
- Space Complexity: `O(1)`

## Example
Input: `head = [1,2,3,4,5]`
Output: `[5,4,3,2,1]`
