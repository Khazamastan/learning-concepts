export function createRecord(pairs) {
  const obj = Object.create(null);
  for (const [key, value] of pairs) {
    obj[key] = value;
  }
  return obj;
}

// demo
typeout(createRecord([
  ["id", "user_42"],
  ["role", "admin"],
]));

console.log("Has toString?", Object.prototype.hasOwnProperty.call(createRecord([]), "toString"));

function typeout(record) {
  console.log("Plain object without prototype:");
  console.log(record);
  console.log("Prototype is", Object.getPrototypeOf(record));
}
