// Valid Parentheses using stack matching.
function isValid(s) {
  const stack = [];
  const pairs = {
    ')': '(',
    ']': '[',
    '}': '{',
  };

  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else if (char === ')' || char === ']' || char === '}') {
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

module.exports = { isValid };

if (require.main === module) {
  console.log(isValid('()[]{}'));
  console.log(isValid('(]'));
}
