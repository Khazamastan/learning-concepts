# Freeze vs seal interactions

## Code

```js
const address = Object.seal({
  street: "Sector 45",
  city: "Gurgaon",
});

const person = {
  name: "Puneet",
  address,
};

Object.freeze(person);

Object.seal(person);

person.name = "Ahuja";
person.address.city = "Noida";

console.log(person.name);
console.log(person.address.city);
```

## Output

```
Puneet
Noida
```

## Explanation

- `Object.freeze` makes `person` immutable at the top level: properties cannot be reconfigured or reassigned. The later `Object.seal` call is redundant.
- Attempting to assign `person.name = "Ahuja"` silently fails (or throws in strict mode), so the name remains `Puneet`.
- Freezing does **not** make nested objects immutable. The sealed `address` object allows updates to existing properties, so `city` successfully changes to `"Noida"`.
