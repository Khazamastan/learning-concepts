// Strings category solutions and explanations.

/**
 * Problem: Length of Last Word
 * Return the length of the last word in the string.
 * Solution: Trim trailing spaces and count contiguous letters backward (O(n) time, O(1) space).
 */
export function lengthOfLastWord(s) {
  let i = s.length - 1;
  while (i >= 0 && s[i] === ' ') i -= 1;
  let length = 0;
  while (i >= 0 && s[i] !== ' ') {
    length += 1;
    i -= 1;
  }
  return length;
}

/**
 * Problem: Find Words Containing Character
 * Given array of words and a target character, return indices of words containing it.
 * Solution: Scan list and collect index when word.includes(char) (O(n * m)).
 */
export function findWordsContaining(words, x) {
  const indices = [];
  for (let i = 0; i < words.length; i += 1) {
    if (words[i].includes(x)) indices.push(i);
  }
  return indices;
}

/**
 * Problem: Jewels and Stones
 * Count how many characters in stones are jewels.
 * Solution: Build a Set of jewels and count matches (O(n + m) time).
 */
export function numJewelsInStones(jewels, stones) {
  const jewelSet = new Set(jewels);
  let count = 0;
  for (const ch of stones) {
    if (jewelSet.has(ch)) count += 1;
  }
  return count;
}

/**
 * Problem: Find Most Frequent Vowel and Consonant
 * Return the most frequent vowel and consonant with their counts (ties broken lexicographically).
 * Solution: Use frequency maps for vowels and consonants separately (O(n) time, O(1) space due to alphabet size).
 */
export function mostFrequentVowelAndConsonant(s) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  const vowelCounts = new Map();
  const consonantCounts = new Map();
  for (const ch of s.toLowerCase()) {
    if (ch < 'a' || ch > 'z') continue;
    const map = vowels.has(ch) ? vowelCounts : consonantCounts;
    map.set(ch, (map.get(ch) ?? 0) + 1);
  }
  const pick = (map) => {
    let bestChar = '';
    let bestCount = 0;
    for (const [char, count] of map.entries()) {
      if (count > bestCount || (count === bestCount && char < bestChar)) {
        bestChar = char;
        bestCount = count;
      }
    }
    return { char: bestChar || null, count: bestCount };
  };
  const vowel = pick(vowelCounts);
  const consonant = pick(consonantCounts);
  return {
    vowel: vowel.char,
    vowelCount: vowel.count,
    consonant: consonant.char,
    consonantCount: consonant.count,
  };
}

/**
 * Problem: Split a String in Balanced Strings
 * Given a string of 'L' and 'R', split into maximum balanced strings where count L == R.
 * Solution: Count difference and increment result when zero (O(n) time, O(1) space).
 */
export function balancedStringSplit(s) {
  let balance = 0;
  let splits = 0;
  for (const ch of s) {
    balance += ch === 'L' ? 1 : -1;
    if (balance === 0) splits += 1;
  }
  return splits;
}

/**
 * Problem: Reverse String II
 * Reverse first k characters for every 2k block.
 * Solution: Iterate with step 2k and reverse substring in-place via array swap (O(n) time).
 */
export function reverseStr(s, k) {
  const chars = s.split('');
  for (let start = 0; start < chars.length; start += 2 * k) {
    let i = start;
    let j = Math.min(start + k - 1, chars.length - 1);
    while (i < j) {
      [chars[i], chars[j]] = [chars[j], chars[i]];
      i += 1;
      j -= 1;
    }
  }
  return chars.join('');
}

/**
 * Problem: Valid Palindrome
 * Check if string is palindrome considering only alphanumerics and ignoring case.
 * Solution: Two-pointer skipping non-alphanumeric, comparing lowercase (O(n) time, O(1) space).
 */
export function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;
  const isAlphaNum = (c) => /[0-9a-zA-Z]/.test(c);
  while (left < right) {
    while (left < right && !isAlphaNum(s[left])) left += 1;
    while (left < right && !isAlphaNum(s[right])) right -= 1;
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left += 1;
    right -= 1;
  }
  return true;
}

/**
 * Problem: Largest Odd Number in a String
 * Return the largest-valued odd-number substring prefix.
 * Solution: Traverse from end to find first odd digit; substring up to it is answer (O(n) time).
 */
export function largestOddNumber(num) {
  for (let i = num.length - 1; i >= 0; i -= 1) {
    if ((num.charCodeAt(i) - 48) % 2 === 1) return num.slice(0, i + 1);
  }
  return '';
}

/**
 * Problem: Longest Common Prefix
 * Find longest common prefix among array of strings.
 * Solution: Compare against minimum-length string, trimming when mismatch occurs (O(n * m)).
 */
export function longestCommonPrefix(strs) {
  if (strs.length === 0) return '';
  let prefix = strs.reduce((min, s) => (s.length < min.length ? s : min), strs[0]);
  for (const s of strs) {
    while (!s.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === '') return '';
    }
  }
  return prefix;
}

/**
 * Problem: Valid Anagram
 * Determine whether t is an anagram of s.
 * Solution: Count characters with array or map; verify all zero (O(n) time, O(1) space for lowercase).
 */
export function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const counts = new Array(26).fill(0);
  for (let i = 0; i < s.length; i += 1) {
    counts[s.charCodeAt(i) - 97] += 1;
    counts[t.charCodeAt(i) - 97] -= 1;
  }
  return counts.every((count) => count === 0);
}

/**
 * Problem: Isomorphic Strings
 * Check if strings s and t are isomorphic (consistent one-to-one mapping).
 * Solution: Use two hash maps to store char mappings both ways (O(n) time).
 */
export function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;
  const mapST = new Map();
  const mapTS = new Map();
  for (let i = 0; i < s.length; i += 1) {
    const a = s[i];
    const b = t[i];
    if ((mapST.has(a) && mapST.get(a) !== b) || (mapTS.has(b) && mapTS.get(b) !== a)) {
      return false;
    }
    mapST.set(a, b);
    mapTS.set(b, a);
  }
  return true;
}

/**
 * Problem: Group Anagrams
 * Group strings that are anagrams.
 * Solution: Use sorted key or frequency signature to map to groups (O(n * m log m) time using sorting).
 */
export function groupAnagrams(strs) {
  const groups = new Map();
  for (const word of strs) {
    const key = word.split('').sort().join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return Array.from(groups.values());
}
