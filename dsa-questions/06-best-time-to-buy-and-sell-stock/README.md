# Best Time to Buy and Sell Stock

## Problem Overview
Given an array `prices` where `prices[i]` is the stock price on day `i`, compute the maximum profit achievable by choosing one day to buy and a later day to sell. If no profit is possible, return `0`.

## Approach
Track the lowest price seen so far and the best profit achievable if sold on the current day. Update the maximum profit whenever a larger gain is observed.

## Algorithm Steps
1. Initialize `minPrice` to infinity and `maxGain` to `0`.
2. For each price:
   - Update `minPrice` when a lower price is found.
   - Otherwise, compute the profit of selling today and update `maxGain` if it is larger.
3. Return `maxGain`.

## Correctness
Maintaining the lowest buying price ensures that each profit calculation respects the temporal constraint (buy before sell). Because every price is considered as a potential selling day, the maximum profit is captured.

## Complexity
- Time Complexity: `O(n)`
- Space Complexity: `O(1)`

## Example
Input: `prices = [7, 1, 5, 3, 6, 4]`
Output: `5`
Buy at price `1` (day 1) and sell at price `6` (day 4).
