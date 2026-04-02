# Valid Parentheses

## Problem Overview
Given a string containing `'(', ')', '{', '}', '[' ,']'`, determine if it is valid. A string is valid if the brackets close with the correct type and order.

## Approach
Use a stack to track opening brackets. When a closing bracket is encountered, it must match the last opening bracket on the stack.

## Algorithm Steps
1. Iterate through each character.
2. If it is an opening bracket, push it onto the stack.
3. If it is a closing bracket, pop from the stack and compare with the expected opening bracket.
4. The string is valid if the stack is empty at the end and all matches succeed.

## Correctness
The stack enforces the last-in-first-out order required for properly nested brackets. A mismatch or leftover opening bracket indicates invalid structure.

## Complexity
- Time Complexity: `O(n)`
- Space Complexity: `O(n)` in the worst case for the stack.

## Example
Input: `s = "()[]{}"`
Output: `true`
