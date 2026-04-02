export function compress(input) {
  if (!input) return "";
  let result = "";
  let count = 1;
  for (let i = 1; i <= input.length; i += 1) {
    if (input[i] === input[i - 1]) {
      count += 1;
    } else {
      result += input[i - 1] + (count > 1 ? count : "");
      count = 1;
    }
  }
  return result;
}

export function decompress(input) {
  if (!input) return "";
  let result = "";
  let char = "";
  let digits = "";

  for (const symbol of input) {
    if (/\d/.test(symbol)) {
      digits += symbol;
    } else {
      if (char) {
        const repeat = digits ? Number(digits) : 1;
        result += char.repeat(repeat);
      }
      char = symbol;
      digits = "";
    }
  }

  if (char) {
    const repeat = digits ? Number(digits) : 1;
    result += char.repeat(repeat);
  }

  return result;
}
