// Foundation category solutions implemented in JavaScript.
// Each function includes a problem statement and an optimal approach explanation.

/**
 * Problem: Sum
 * Given an array of numbers, compute the total sum.
 * Solution: Iterate once and aggregate using addition (O(n) time, O(1) extra space).
 */
export function sum(nums) {
  let total = 0;
  for (const num of nums) total += num;
  return total;
}

/**
 * Problem: Second Largest
 * Return the second largest distinct number in an array; throw if unavailable.
 * Solution: Track the largest and second largest in one pass (O(n) time, O(1) space).
 */
export function secondLargest(nums) {
  let max = -Infinity;
  let second = -Infinity;
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) continue;
    seen.add(num);
    if (num > max) {
      second = max;
      max = num;
    } else if (num > second) {
      second = num;
    }
  }
  if (second === -Infinity) {
    throw new Error('Array must contain at least two distinct values.');
  }
  return second;
}

/**
 * Problem: Palindrome Number
 * Determine whether an integer reads the same forward and backward.
 * Solution: Reverse half of the digits without converting to string for O(log10 n) time.
 */
export function isPalindromeNumber(x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let reversed = 0;
  while (x > reversed) {
    reversed = reversed * 10 + (x % 10);
    x = Math.trunc(x / 10);
  }
  return x === reversed || x === Math.trunc(reversed / 10);
}

/**
 * Problem: Reverse Integer
 * Reverse digits of a 32-bit signed integer; return 0 if overflow occurs.
 * Solution: Pop digits with modulo and check overflow bounds each step (O(log10 n)).
 */
export function reverseInteger(x) {
  let result = 0;
  let n = x;
  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);
  while (n !== 0) {
    const digit = n % 10;
    n = (n / 10) | 0;
    if (result > INT_MAX / 10 || (result === INT_MAX / 10 && digit > 7)) return 0;
    if (result < INT_MIN / 10 || (result === INT_MIN / 10 && digit < -8)) return 0;
    result = result * 10 + digit;
  }
  return result;
}

/**
 * Problem: Count Negative Numbers in an Array
 * Given a non-increasing grid (each row and column sorted descending), count negatives.
 * Solution: Start from top-right and move left/down to use monotonicity (O(m + n)).
 */
export function countNegatives(grid) {
  let count = 0;
  let row = 0;
  let col = grid[0]?.length - 1 ?? -1;
  while (row < grid.length && col >= 0) {
    if (grid[row][col] < 0) {
      count += grid.length - row;
      col -= 1;
    } else {
      row += 1;
    }
  }
  return count;
}

/**
 * Problem: Find Smallest Number in an Array
 * Return the minimum value.
 * Solution: Single pass min tracking (O(n) time, O(1) space).
 */
export function findSmallest(nums) {
  if (nums.length === 0) throw new Error('Array must be non-empty.');
  let min = nums[0];
  for (let i = 1; i < nums.length; i += 1) {
    if (nums[i] < min) min = nums[i];
  }
  return min;
}

/**
 * Problem: Find Largest Number in an Array
 * Return the maximum value.
 * Solution: Single pass max tracking (O(n) time, O(1) space).
 */
export function findLargest(nums) {
  if (nums.length === 0) throw new Error('Array must be non-empty.');
  let max = nums[0];
  for (let i = 1; i < nums.length; i += 1) {
    if (nums[i] > max) max = nums[i];
  }
  return max;
}

/**
 * Problem: Binary Search
 * Find target index in sorted array or return -1.
 * Solution: Classic binary search with two pointers (O(log n)).
 */
export function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

/**
 * Problem: Merge Sort
 * Sort an array of numbers.
 * Solution: Divide-and-conquer merge sort with O(n log n) time and O(n) space.
 */
export function mergeSort(nums) {
  if (nums.length <= 1) return nums.slice();
  const mid = Math.floor(nums.length / 2);
  const left = mergeSort(nums.slice(0, mid));
  const right = mergeSort(nums.slice(mid));
  const merged = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) merged.push(left[i++]);
    else merged.push(right[j++]);
  }
  while (i < left.length) merged.push(left[i++]);
  while (j < right.length) merged.push(right[j++]);
  return merged;
}

/**
 * Problem: Power of Two
 * Determine if integer is a power of two.
 * Solution: Use bit trick n & (n - 1) == 0 for positive n (O(1) time).
 */
export function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}
