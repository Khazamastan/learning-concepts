# Object destructuring output

## Code

```js
const person = {
  name: "Ada",
  address: {
    city: "London",
    country: "UK",
  },
};

const {
  name: firstName,
  address: { city },
  address,
} = person;

address.city = "Paris";

console.log(firstName);
console.log(city);
console.log(person.address.city);
```

## Output

```
Ada
London
Paris
```

## Explanation

- `city` is a primitive pulled out of the nested object, so it keeps the original string value (`"London"`).
- `address` is a reference to the same nested object. Mutating `address.city` therefore mutates `person.address.city`.
- Logging `person.address.city` after mutation shows `"Paris"`.
