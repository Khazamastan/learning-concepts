// Two Pointers & Sliding Window solutions with explanations.

/**
 * Problem: Two Sum
 * Return indices of two numbers adding to target.
 * Solution: Hash map of complement to achieve O(n) time.
 */
export function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i += 1) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [-1, -1];
}

/**
 * Problem: Two Sum II - Input array is sorted.
 * Solution: Two-pointer approach from both ends to reach target (O(n) time).
 */
export function twoSumII(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left += 1;
    else right -= 1;
  }
  return [-1, -1];
}

/**
 * Problem: Is Subsequence
 * Determine if s is subsequence of t.
 * Solution: Advance pointer in s while walking t (O(n) time).
 */
export function isSubsequence(s, t) {
  let i = 0;
  for (const ch of t) {
    if (i < s.length && s[i] === ch) i += 1;
  }
  return i === s.length;
}

/**
 * Problem: Find Index of First Occurrence in String (strStr)
 * Return index of first occurrence of needle in haystack or -1.
 * Solution: Rolling window comparison; for brevity use built-in indexOf (O((n-m+1)*m)).
 */
export function strStr(haystack, needle) {
  return haystack.indexOf(needle);
}

/**
 * Problem: Intersection of Two Linked Lists (Two-pointer variant)
 * Solution: Switch pointer heads to equalize path length (O(m+n) time, O(1) space).
 */
export function getIntersectionNodeTwoPointer(headA, headB) {
  if (!headA || !headB) return null;
  let a = headA;
  let b = headB;
  while (a !== b) {
    a = a ? a.next : headB;
    b = b ? b.next : headA;
  }
  return a;
}

/**
 * Problem: Container With Most Water
 * Return max area formed by vertical lines.
 * Solution: Two-pointer shrinking from both ends based on shorter line (O(n) time).
 */
export function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let best = 0;
  while (left < right) {
    const h = Math.min(height[left], height[right]);
    best = Math.max(best, h * (right - left));
    if (height[left] < height[right]) left += 1;
    else right -= 1;
  }
  return best;
}

/**
 * Problem: Three Sum
 * Find unique triplets that sum to zero.
 * Solution: Sort array and use two-pointer scan for each pivot (O(n^2) time).
 */
export function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length; i += 1) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        left += 1;
        right -= 1;
        while (left < right && nums[left] === nums[left - 1]) left += 1;
        while (left < right && nums[right] === nums[right + 1]) right -= 1;
      } else if (sum < 0) left += 1;
      else right -= 1;
    }
  }
  return result;
}

/**
 * Problem: Trapping Rain Water
 * Compute trapped water given elevation map.
 * Solution: Two-pointer tracking max left/right heights (O(n) time, O(1) space).
 */
export function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left += 1;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right -= 1;
    }
  }
  return water;
}

/**
 * Problem: Longest Substring Without Repeating Characters
 * Return length of longest substring without repeating characters.
 * Solution: Sliding window with map of last seen indices (O(n) time).
 */
export function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right += 1) {
    const ch = s[right];
    if (seen.has(ch) && seen.get(ch) >= left) left = seen.get(ch) + 1;
    seen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

/**
 * Problem: Longest Repeating Character Replacement
 * Return length of longest substring after replacing at most k characters to make repeating.
 * Solution: Sliding window tracking max frequency within window (O(n) time).
 */
export function characterReplacement(s, k) {
  const counts = new Array(26).fill(0);
  let left = 0;
  let maxCount = 0;
  let best = 0;
  for (let right = 0; right < s.length; right += 1) {
    const idx = s.charCodeAt(right) - 65;
    counts[idx] += 1;
    maxCount = Math.max(maxCount, counts[idx]);
    while (right - left + 1 - maxCount > k) {
      counts[s.charCodeAt(left) - 65] -= 1;
      left += 1;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}

/**
 * Problem: Permutation in String
 * Check if s2 contains a permutation of s1.
 * Solution: Sliding window with frequency difference array (O(n) time).
 */
export function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;
  const diff = new Array(26).fill(0);
  for (let i = 0; i < s1.length; i += 1) {
    diff[s1.charCodeAt(i) - 97] += 1;
    diff[s2.charCodeAt(i) - 97] -= 1;
  }
  const zeroCount = () => diff.every((v) => v === 0);
  if (zeroCount()) return true;
  for (let i = s1.length; i < s2.length; i += 1) {
    diff[s2.charCodeAt(i) - 97] -= 1;
    diff[s2.charCodeAt(i - s1.length) - 97] += 1;
    if (zeroCount()) return true;
  }
  return false;
}

/**
 * Problem: Sliding Window Maximum
 * Return maximum of each window of size k.
 * Solution: Monotonic deque storing indices with decreasing values (O(n) time).
 */
export function maxSlidingWindow(nums, k) {
  const deque = [];
  const result = [];
  for (let i = 0; i < nums.length; i += 1) {
    while (deque.length && deque[0] <= i - k) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}
