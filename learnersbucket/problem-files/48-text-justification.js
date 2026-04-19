/**
 * Problem #48: Text Justification
 *
 * Detailed Problem Statement:
 * Given words and width, format fully-justified lines.
 *
 * Example Input:
 * words = ["This", "is", "an", "example", "text"], maxWidth = 10
 *
 * Example Output:
 * [
 *   "This  is an",
 *   "example   ",
 *   "text      "
 * ]
 */

export const problem = `Text Justification`;

export const statement = `
Given words and width, format fully-justified lines.
`.trim();

export const exampleInput = `
words = ["This", "is", "an", "example", "text"], maxWidth = 10
`.trim();

export const exampleOutput = `
[
  "This  is an",
  "example   ",
  "text      "
]
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function fullJustify(words, maxWidth) {
  const lines = [];
  let i = 0;

  while (i < words.length) {
    let j = i;
    let len = 0;

    while (j < words.length && len + words[j].length + (j - i) <= maxWidth) {
      len += words[j].length;
      j += 1;
    }

    const gaps = j - i - 1;
    let line = '';

    if (j === words.length || gaps === 0) {
      line = words.slice(i, j).join(' ');
      line += ' '.repeat(maxWidth - line.length);
    } else {
      const totalSpaces = maxWidth - len;
      const each = Math.floor(totalSpaces / gaps);
      const extra = totalSpaces % gaps;

      for (let k = i; k < j - 1; k += 1) {
        line += words[k];
        line += ' '.repeat(each + (k - i < extra ? 1 : 0));
      }
      line += words[j - 1];
    }

    lines.push(line);
    i = j;
  }

  return lines;
}

// ---------------------------
// Approach 2: Brute-force baseline
// ---------------------------
function bruteForce(input) {
  // Try all candidates/pairs/ranges.
  // Validate each and keep the best.
  return input;
}

// ---------------------------
// Approach 3: Optimized with data structures
// ---------------------------
function optimized(input) {
  const state = new Map();
  // Build lookup/prefix/two-pointer state.
  // Return optimized result.
  return input;
}
