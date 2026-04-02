# Detect Overlapping Circles

## Problem
Given a list of circles with centres and radii, determine whether any overlap
and return the colliding pairs. Useful for collision detection demos and visual
highlighting.

## Solution
The `detectOverlappingCircles` helper compares every pair once via a nested loop.
It computes the distance between centres with `Math.hypot` and checks if that
distance is smaller than the sum of radii. Matching pairs are collected in an
array and the function reports both the boolean `hasOverlap` and the list of
pairs.

## Running locally
```
npm install
npm start
```
