function groupBy(collection, iteratee) {
  const keyGetter = typeof iteratee === "function"
    ? iteratee
    : (item) => item[iteratee];

  return collection.reduce((acc, item, index) => {
    const key = keyGetter(item, index, collection);
    const bucket = acc[key] || (acc[key] = []);
    bucket.push(item);
    return acc;
  }, {});
}

const data = [
  { category: "fruit", name: "apple" },
  { category: "vegetable", name: "carrot" },
  { category: "fruit", name: "banana" },
  { category: "vegetable", name: "kale" },
];

console.log(groupBy(data, "category"));
console.log(groupBy([6.1, 4.2, 6.3], Math.floor));
