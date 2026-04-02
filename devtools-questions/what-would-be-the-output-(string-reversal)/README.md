# Attempting to reverse a string in-place

## Code

```js
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
```

## Output

```
hello
```

## Explanation

- Strings are immutable in JavaScript; indexing into them returns a character but you cannot assign back to change the underlying string.
- The loop attempts to swap characters, but each assignment is silently ignored. The original string is returned untouched, so `console.log` prints `hello`.
- To reverse a string imperatively, convert it to an array of characters first (`const chars = string.split("");`), perform swaps, and then join.
