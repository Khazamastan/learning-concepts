# Longest Palindromic Substring

## Problem Overview
Given a string `s`, return the longest palindromic substring within it.

## Approach
Expand around potential palindrome centers. Every palindrome is defined by its center, which can be a single character (odd length) or a gap between characters (even length).

## Algorithm Steps
1. If the string length is less than two, return the string itself.
2. For each index `i`:
   - Expand around `(i, i)` for odd-length palindromes.
   - Expand around `(i, i + 1)` for even-length palindromes.
3. Keep track of the best start and end indices found.
4. Return the substring defined by the best indices.

## Correctness
Expanding from every center guarantees that each palindrome in the string is considered. The longest palindrome must arise from one of these centers, so capturing the maximum span encountered yields the correct answer.

## Complexity
- Time Complexity: `O(n^2)` in the worst case (e.g., strings of identical characters).
- Space Complexity: `O(1)` extra space.

## Example
Input: `s = "babad"`
Output: `"bab"` (or `"aba"`)
