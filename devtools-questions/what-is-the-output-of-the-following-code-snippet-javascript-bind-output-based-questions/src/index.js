var foo = 1;
var change = () => {
  this.foo = 2;
  console.log(this.foo);
};
var obj = {
  foo: 3,
};
var bounded = change.bind(obj);

console.log(foo);
console.log(change());
console.log(foo);
console.log(obj.foo);
console.log(bounded());
