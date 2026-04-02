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
