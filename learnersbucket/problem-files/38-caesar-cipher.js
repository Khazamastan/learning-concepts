/**
 * Problem #38: Caesar Cipher
 *
 * Detailed Problem Statement:
 * Shift alphabet characters by `k` while preserving case.
 *
 * Example Input:
 * caesar("Abc-Z", 2)
 *
 * Example Output:
 * "Cde-B"
 */

export const problem = `Caesar Cipher`;

export const statement = `
Shift alphabet characters by \`k\` while preserving case.
`.trim();

export const exampleInput = `
caesar("Abc-Z", 2)
`.trim();

export const exampleOutput = `
"Cde-B"
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function caesar(str, k) {
  const shift = ((k % 26) + 26) % 26;

  return [...str].map((ch) => {
    const code = ch.charCodeAt(0);
    const isUpper = code >= 65 && code <= 90;
    const isLower = code >= 97 && code <= 122;

    if (!isUpper && !isLower) return ch;

    const base = isUpper ? 65 : 97;
    return String.fromCharCode(base + ((code - base + shift) % 26));
  }).join('');
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
