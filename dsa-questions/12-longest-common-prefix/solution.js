// Longest Common Prefix by scanning the shortest prefix.
function longestCommonPrefix(strs) {
  if (strs.length === 0) {
    return '';
  }

  let prefix = strs[0];
  for (let i = 1; i < strs.length; i += 1) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (prefix === '') {
        return '';
      }
    }
  }
  return prefix;
}

module.exports = { longestCommonPrefix };

if (require.main === module) {
  console.log(longestCommonPrefix(['flower', 'flow', 'flight']));
  console.log(longestCommonPrefix(['dog', 'racecar', 'car']));
}
