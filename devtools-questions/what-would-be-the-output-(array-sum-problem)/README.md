# Array sum pitfalls

## Code

```js
const numbers = [10, 20, 30];
numbers.bonus = 100;

let forInTotal = 0;
for (const key in numbers) {
  forInTotal += numbers[key];
}
console.log(forInTotal);

let forOfTotal = 0;
for (const value of numbers) {
  forOfTotal += value;
}
console.log(forOfTotal);

const reduceTotal = numbers.reduce((acc, value) => acc + value, 0);
console.log(reduceTotal === forOfTotal);
```

## Output

```
160
60
true
```

## Explanation

- `for...in` walks enumerable property names, including the custom `bonus` property we added, so the total becomes `10 + 20 + 30 + 100 = 160`.
- `for...of` iterates actual element values and ignores non-index keys, giving the expected numeric sum `60`.
- `Array.prototype.reduce` only feeds real elements into the reducer. Comparing its result with the `for...of` total confirms that the idiomatic approaches agree.
