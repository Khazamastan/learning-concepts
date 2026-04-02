# Linked List Cycle

## Problem Overview
Determine whether a linked list contains a cycle. A cycle exists if a node can be reached again by following the `next` pointers.

## Approach
Use Floyd's tortoise and hare algorithm. Move one pointer (`slow`) one step at a time and another (`fast`) two steps. If they ever meet, a cycle exists; if `fast` reaches the end, the list is acyclic.

## Algorithm Steps
1. Initialize `slow` and `fast` to `head`.
2. While `fast` and `fast.next` are not null, move `slow` one step and `fast` two steps; if they meet return `true`.
3. If the loop finishes, return `false`.

## Correctness
In a cycle, the faster pointer laps the slower pointer, guaranteeing a meeting point. If there is no cycle, the fast pointer reaches the end, proving the list is linear.

## Complexity
- Time Complexity: `O(n)`
- Space Complexity: `O(1)`

## Example
Input: `head = [3,2,0,-4]` with `pos = 1`
Output: `true`
