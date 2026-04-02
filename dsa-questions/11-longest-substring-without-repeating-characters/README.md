# Longest Substring Without Repeating Characters

## Problem Overview
Given a string `s`, return the length of the longest substring without repeating characters.

## Approach
Use the sliding window technique with a map that tracks the last index where each character appeared. Adjust the left boundary of the window whenever a repeated character enters the current window.

## Algorithm Steps
1. Initialize `start` to the beginning of the current window and `maxLength` to zero.
2. Iterate through characters with index `i`:
   - If the character has been seen at or after `start`, move `start` to one position after the previous occurrence.
   - Update the character's last-seen index to `i`.
   - Update `maxLength` with the current window length `i - start + 1`.
3. Return `maxLength`.

## Correctness
The `start` pointer always marks the beginning of the longest valid window ending at the current index. Shifting `start` past duplicates ensures every window contains unique characters, so the maximum observed window length is the desired answer.

## Complexity
- Time Complexity: `O(n)` because each character is inserted and removed from the window at most once.
- Space Complexity: `O(min(n, alphabet))` for the map of last-seen positions.

## Example
Input: `s = "abcabcbb"`
Output: `3`
The longest substring without repeating characters is `"abc"`.
