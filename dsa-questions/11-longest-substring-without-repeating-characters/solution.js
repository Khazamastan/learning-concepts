// Longest Substring Without Repeating Characters using sliding window.
function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let start = 0;
  let maxLength = 0;

  for (let i = 0; i < s.length; i += 1) {
    const char = s[i];
    if (lastSeen.has(char) && lastSeen.get(char) >= start) {
      start = lastSeen.get(char) + 1;
    }
    lastSeen.set(char, i);
    const windowLength = i - start + 1;
    if (windowLength > maxLength) {
      maxLength = windowLength;
    }
  }

  return maxLength;
}

module.exports = { lengthOfLongestSubstring };

if (require.main === module) {
  console.log(lengthOfLongestSubstring('abcabcbb'));
}
