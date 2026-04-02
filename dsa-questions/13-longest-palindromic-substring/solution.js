// Longest Palindromic Substring via expanding around centers.
function longestPalindrome(s) {
  if (s.length < 2) {
    return s;
  }

  let start = 0;
  let end = 0;

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left -= 1;
      right += 1;
    }
    return [left + 1, right - 1];
  }

  for (let i = 0; i < s.length; i += 1) {
    const [left1, right1] = expandAroundCenter(i, i); // Odd length
    if (right1 - left1 > end - start) {
      start = left1;
      end = right1;
    }

    const [left2, right2] = expandAroundCenter(i, i + 1); // Even length
    if (right2 - left2 > end - start) {
      start = left2;
      end = right2;
    }
  }

  return s.substring(start, end + 1);
}

module.exports = { longestPalindrome };

if (require.main === module) {
  console.log(longestPalindrome('babad'));
  console.log(longestPalindrome('cbbd'));
}
