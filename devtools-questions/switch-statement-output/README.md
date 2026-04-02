# Switch statement surprises

## Code

```js
const input = "2";

switch (input) {
  case 2:
    console.log("number case");
    break;
  case "2":
    console.log("string case");
  default:
    console.log("default block");
}

const status = (() => {
  switch (true) {
    case input === "2" && typeof input === "string":
      return "matched strict string";
    case input == 2:
      return "matched loose equality";
    default:
      return "no match";
  }
})();

console.log(status);
```

## Output

```
string case
default block
matched strict string
```

## Explanation

- `switch` compares cases using strict equality (`===`). The number case (`2`) does not match the string value, so control continues.
- The `'2'` case matches; because there is no `break`, execution falls through into the `default` block and prints a second line.
- The second `switch` uses the common `switch(true)` pattern to express compound conditions. The first branch matches and returns immediately, so no fallthrough occurs there.
