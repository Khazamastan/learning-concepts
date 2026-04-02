// Arrays category solutions implemented in JavaScript with explanations.

/**
 * Problem: Remove Duplicates from Sorted Array
 * Modify the sorted array in-place so each element appears once and return the new length.
 * Solution: Use two pointers to overwrite duplicates while preserving order (O(n) time, O(1) space).
 */
export function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let write = 1;
  for (let read = 1; read < nums.length; read += 1) {
    if (nums[read] !== nums[write - 1]) {
      nums[write] = nums[read];
      write += 1;
    }
  }
  return write;
}

/**
 * Problem: Remove Element
 * Remove all instances of val in-place and return the new length.
 * Solution: Write pointer compacts elements not equal to val (O(n) time, O(1) space).
 */
export function removeElement(nums, val) {
  let write = 0;
  for (let read = 0; read < nums.length; read += 1) {
    if (nums[read] !== val) {
      nums[write] = nums[read];
      write += 1;
    }
  }
  return write;
}

/**
 * Problem: Reverse String
 * Reverse an array of characters in-place.
 * Solution: Swap symmetric characters with two-pointer traversal (O(n) time, O(1) space).
 */
export function reverseString(chars) {
  let left = 0;
  let right = chars.length - 1;
  while (left < right) {
    [chars[left], chars[right]] = [chars[right], chars[left]];
    left += 1;
    right -= 1;
  }
  return chars;
}

/**
 * Problem: Best Time to Buy and Sell Stock
 * Given daily prices, return max profit from one transaction.
 * Solution: Track minimum price so far and best profit (O(n) time, O(1) space).
 */
export function maxProfit(prices) {
  let minPrice = Infinity;
  let best = 0;
  for (const price of prices) {
    if (price < minPrice) minPrice = price;
    else best = Math.max(best, price - minPrice);
  }
  return best;
}

/**
 * Problem: Merge Sorted Arrays
 * Merge sorted nums2 into nums1 where nums1 has extra space; return nums1.
 * Solution: Fill from the end with a three-pointer technique (O(m + n) time, O(1) space).
 */
export function mergeSortedArrays(nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;
  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i -= 1;
    } else {
      nums1[k] = nums2[j];
      j -= 1;
    }
    k -= 1;
  }
  return nums1;
}

/**
 * Problem: Move Zeros
 * Move all zeros to the end while maintaining relative order.
 * Solution: Stable partition using two pointers (O(n) time, O(1) space).
 */
export function moveZeroes(nums) {
  let write = 0;
  for (let read = 0; read < nums.length; read += 1) {
    if (nums[read] !== 0) {
      [nums[write], nums[read]] = [nums[read], nums[write]];
      write += 1;
    }
  }
  return nums;
}

/**
 * Problem: Max Consecutive Ones
 * Return the maximum number of consecutive 1s in the binary array.
 * Solution: Scan once counting current streak and updating best (O(n) time, O(1) space).
 */
export function findMaxConsecutiveOnes(nums) {
  let best = 0;
  let current = 0;
  for (const num of nums) {
    if (num === 1) {
      current += 1;
      best = Math.max(best, current);
    } else {
      current = 0;
    }
  }
  return best;
}

/**
 * Problem: Missing Number
 * Array contains numbers 0..n with one missing; find it.
 * Solution: XOR index and values to isolate missing number (O(n) time, O(1) space).
 */
export function missingNumber(nums) {
  let xor = nums.length;
  for (let i = 0; i < nums.length; i += 1) {
    xor ^= i ^ nums[i];
  }
  return xor;
}

/**
 * Problem: Single Number
 * Every element appears twice except one; find the single number.
 * Solution: XOR all values to cancel duplicates (O(n) time, O(1) space).
 */
export function singleNumber(nums) {
  let result = 0;
  for (const num of nums) result ^= num;
  return result;
}

/**
 * Problem: Trapping Rain Water
 * Given an elevation map, compute total trapped rain water.
 * Solution: Two-pointer sweep tracking left/right maxima (O(n) time, O(1) space).
 */
export function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let total = 0;

  while (left <= right) {
    if (height[left] <= height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        total += leftMax - height[left];
      }
      left += 1;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        total += rightMax - height[right];
      }
      right -= 1;
    }
  }

  return total;
}
