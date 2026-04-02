const arrayLike = { length: 0 };
Object.setPrototypeOf(arrayLike, Array.prototype);

arrayLike.push("alpha");
arrayLike.push("beta");

console.log(Array.isArray(arrayLike));
console.log(arrayLike.length);

arrayLike.length = 0;
console.log(arrayLike[0], arrayLike[1]);
console.log(Object.keys(arrayLike));

const realArray = ["alpha", "beta"];
realArray.length = 0;
console.log(realArray[0]);
console.log(realArray.length);
