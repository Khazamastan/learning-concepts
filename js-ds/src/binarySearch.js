// Binary Search algorithm solutions and explanations.

/**
 * Problem: Square Root of X
 * Return the integer square root (floor) of a non-negative integer.
 * Solution: Binary search between 0 and x to find largest mid with mid^2 <= x (O(log x)).
 */
export function mySqrt(x) {
  if (x < 2) return x;
  let left = 1;
  let right = Math.floor(x / 2);
  let ans = 0;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const square = mid * mid;
    if (square === x) return mid;
    if (square < x) {
      ans = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return ans;
}

/**
 * Problem: Guess Higher or Lower
 * Find hidden number between 1 and n using guess API (-1,0,1).
 * Solution: Binary search leveraging provided guess function (O(log n)).
 */
export function guessNumber(n, guess) {
  let left = 1;
  let right = n;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const res = guess(mid);
    if (res === 0) return mid;
    if (res < 0) right = mid - 1;
    else left = mid + 1;
  }
  return -1;
}

/**
 * Problem: Search in Rotated Sorted Array
 * Find target in rotated sorted array with distinct values.
 * Solution: Binary search comparing halves to determine sorted side (O(log n)).
 */
export function searchRotated(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}

/**
 * Problem: First Bad Version
 * Given isBadVersion API, find first bad version in 1..n.
 * Solution: Binary search for leftmost true (O(log n)).
 */
export function firstBadVersion(n, isBadVersion) {
  let left = 1;
  let right = n;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (isBadVersion(mid)) right = mid;
    else left = mid + 1;
  }
  return left;
}

/**
 * Problem: Find Peak Element
 * Return index of a peak element (element greater than neighbors).
 * Solution: Binary search based on slope; move toward increasing side (O(log n)).
 */
export function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < nums[mid + 1]) left = mid + 1;
    else right = mid;
  }
  return left;
}

/**
 * Problem: Find Minimum in Rotated Sorted Array
 * Return minimum element in rotated sorted array without duplicates.
 * Solution: Binary search comparing mid to right (O(log n)).
 */
export function findMin(nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] > nums[right]) left = mid + 1;
    else right = mid;
  }
  return nums[left];
}

/**
 * Problem: Find First and Last Position in Sorted Array
 * Return starting and ending index of target; [-1,-1] if absent.
 * Solution: Binary search helper for lower/upper bound (O(log n)).
 */
export function searchRange(nums, target) {
  const findBound = (first) => {
    let left = 0;
    let right = nums.length - 1;
    let ans = -1;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (nums[mid] === target) {
        ans = mid;
        if (first) right = mid - 1;
        else left = mid + 1;
      } else if (nums[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    return ans;
  };
  return [findBound(true), findBound(false)];
}

/**
 * Problem: Find Peak in a Mountain Array
 * Return index of peak (maximum) element in mountain array.
 * Solution: Binary search on slope similar to findPeakElement (O(log n)).
 */
export function peakIndexInMountainArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] < arr[mid + 1]) left = mid + 1;
    else right = mid;
  }
  return left;
}

/**
 * Problem: Single Element in a Sorted Array
 * Every element appears twice except one; find that element.
 * Solution: Binary search on pair parity: compare mid with neighbor (O(log n)).
 */
export function singleNonDuplicate(nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);
    if (mid % 2 === 1) mid -= 1;
    if (nums[mid] === nums[mid + 1]) left = mid + 2;
    else right = mid;
  }
  return nums[left];
}

/**
 * Problem: Find k Closest Elements
 * Return k elements closest to x in sorted array, preferring smaller values on ties.
 * Solution: Binary search window left boundary between 0 and n-k (O(log(n-k))).
 */
export function findClosestElements(arr, k, x) {
  let left = 0;
  let right = arr.length - k;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (x - arr[mid] > arr[mid + k] - x) left = mid + 1;
    else right = mid;
  }
  return arr.slice(left, left + k);
}
