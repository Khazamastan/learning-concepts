function reverse(string) {
  let i;
  let temp;
  const limit = parseInt(string.length / 2, 10);

  for (i = 0; i < limit; i++) {
    temp = string[i];
    string[i] = string[string.length - i - 1];
    string[string.length - i - 1] = temp;
  }

  return string;
}

const reversed = reverse("hello");
console.log(reversed);
