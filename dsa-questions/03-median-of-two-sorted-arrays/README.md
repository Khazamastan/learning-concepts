# Median of Two Sorted Arrays

## Problem Overview
Given two sorted arrays `nums1` and `nums2` of sizes `m` and `n`, return the median of the combined multiset. The desired time complexity is `O(log(m + n))`.

## Approach
Binary search the smaller array to find a partition that splits both arrays into left and right halves with equal size (or differing by one when total length is odd) such that every element on the left is less than or equal to every element on the right. The median is then obtained from boundary values of the partitions.

## Algorithm Steps
1. Ensure `nums1` is the smaller array to keep the binary search range minimal.
2. Perform binary search on the partition index of `nums1`.
3. Derive the corresponding partition in `nums2` so that left halves contain half of the combined elements.
4. Compare boundary elements to verify the correct partition. Adjust the search range otherwise.
5. Once a valid partition is found:
   - If the total number of elements is even, the median is the average of the two middle boundary values.
   - If odd, the median is the maximum of the left boundary values.

## Correctness
At the correct partition, all elements in the left half are less than or equal to those in the right half, preserving the sorted order across the merged array. Therefore, the median is determined solely by the boundary elements.

## Complexity
- Time Complexity: `O(log(min(m, n)))` due to binary search on the smaller array.
- Space Complexity: `O(1)` because only constant extra space is used.

## Example
Input: `nums1 = [1, 3]`, `nums2 = [2]`
Partition yields left half `[1, 2]` and right half `[3]`. Median is `2.0`.
