import { groupBy } from "./groupBy.js";

const people = [
  { name: "Anita", role: "designer" },
  { name: "Rahul", role: "engineer" },
  { name: "Isha", role: "engineer" },
  { name: "Vikram", role: "designer" },
];

console.log(groupBy(people, "role"));
console.log(
  groupBy(people, (person) => person.name.charAt(0)),
);
