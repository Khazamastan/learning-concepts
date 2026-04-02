# Copying nested objects

## Code

```js
const saiyan = {
  name: "Vegeta",
  chiBlasts: {
    low: "Big bang attack",
    med: "Gallic gun",
    high: "Final flash",
  },
};

const anotherSaiyan = { ...saiyan };
anotherSaiyan.name = "Goku";
anotherSaiyan.chiBlasts.high = "Spirit Bomb";

const sonOfSaiyan = Object.assign({}, saiyan);
sonOfSaiyan.name = "Trunks";
sonOfSaiyan.chiBlasts.high = "Finish Buster";

const sonOfAnotherSaiyan = JSON.parse(JSON.stringify(anotherSaiyan));
sonOfAnotherSaiyan.name = "Gohan";
sonOfAnotherSaiyan.chiBlasts.high = "Kamehameha";

console.log(
  saiyan.name,
  anotherSaiyan.name,
  sonOfSaiyan.name,
  sonOfAnotherSaiyan.name
);
console.log(
  saiyan.chiBlasts.high,
  anotherSaiyan.chiBlasts.high,
  sonOfSaiyan.chiBlasts.high,
  sonOfAnotherSaiyan.chiBlasts.high
);
```

## Output

```
Vegeta Goku Trunks Gohan
Finish Buster Finish Buster Finish Buster Kamehameha
```

## Explanation

- Both the spread copy and `Object.assign` perform **shallow** copies, so `chiBlasts` is shared between `saiyan`, `anotherSaiyan`, and `sonOfSaiyan`. Each mutation of `chiBlasts.high` through one of them updates the same object.
- `JSON.parse(JSON.stringify(...))` creates a deep clone for `sonOfAnotherSaiyan`. Changes made after the clone only affect that detached copy, which is why its `high` blast differs in the final log.
