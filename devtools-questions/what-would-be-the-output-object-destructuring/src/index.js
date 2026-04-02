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
