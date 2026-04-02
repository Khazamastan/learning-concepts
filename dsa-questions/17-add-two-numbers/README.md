# Add Two Numbers

## Problem Overview
Two non-empty linked lists represent two non-negative integers stored in reverse order. Add the numbers and return the sum as a linked list, also in reverse order.

## Approach
Traverse both lists simultaneously, digit by digit, managing a carry just as in manual addition. Create new nodes for each summed digit.

## Algorithm Steps
1. Initialize a dummy head node and set `current` to it. Set `carry` to `0`.
2. While there are digits left in either list or a non-zero carry:
   - Sum the current digits and the carry.
   - Compute the new digit (`sum % 10`) and the new carry (`Math.floor(sum / 10)`).
   - Append a node containing the digit to the result list and advance pointers.
3. Return `dummyHead.next`.

## Correctness
Each iteration adds corresponding digits along with the carry, matching the elementary addition process. Because digits are stored in reverse order, summing from the heads naturally processes from least significant to most significant digit.

## Complexity
- Time Complexity: `O(max(m, n))` where `m` and `n` are the lengths of the input lists.
- Space Complexity: `O(max(m, n))` for the output list (required for the result).

## Example
Input: `l1 = [2,4,3]`, `l2 = [5,6,4]`
Output: `[7,0,8]`
