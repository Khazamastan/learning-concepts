# Longest Common Prefix

## Problem Overview
Given an array of strings, return the longest common prefix shared by all strings. If none exists, return an empty string.

## Approach
Use horizontal scanning: assume the entire first string is the prefix, then iteratively shorten it until it is a prefix of every other string.

## Algorithm Steps
1. Initialize `prefix` with the first string.
2. For each subsequent string:
   - While the current string does not start with `prefix`, drop the last character from `prefix`.
   - If `prefix` becomes empty, return `''` immediately.
3. After all strings are processed, return `prefix`.

## Correctness
Removing characters from the end of the prefix guarantees that the remaining prefix is shared among the processed strings. Because no characters are ever added, the final prefix is the longest common prefix for all strings.

## Complexity
- Time Complexity: `O(S)` where `S` is the total number of characters across all strings.
- Space Complexity: `O(1)` additional space.

## Example
Input: `strs = ["flower", "flow", "flight"]`
Output: `"fl"`
