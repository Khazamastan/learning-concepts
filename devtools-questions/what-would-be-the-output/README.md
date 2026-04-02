# String vs number coercion

## Code

```js
const first = 6;
const second = "6";
const third = first + second;
const fourth = first - second;
const fifth = third + first * first;
const sixth = fourth + second * second;

console.log("Fifth is --", fifth, typeof fifth);
console.log("Sixth is --", sixth, typeof sixth);
```

## Output

```
Fifth is -- 6636 string
Sixth is -- 36 number
```

## Explanation

- `third` becomes the string `"66"` because the `+` operator concatenates when either operand is a string.
- `first * first` evaluates to the number `36`. Concatenating a string with a number produces another string, so `fifth` ends up as `"66" + "36" = "6636"` and retains the type `string`.
- `fourth` is `0` because subtraction coerces both operands to numbers. Multiplication does the same, so `second * second` is `36`, and adding that to `0` yields the numeric result `36`.
