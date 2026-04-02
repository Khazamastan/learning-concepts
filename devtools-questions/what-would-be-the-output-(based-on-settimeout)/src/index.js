console.log("start");

setTimeout(() => {
  console.log("timer A");
  Promise.resolve().then(() => console.log("microtask inside timer"));
}, 0);

setTimeout(() => {
  console.log("timer B");
}, 0);

Promise.resolve().then(() => console.log("microtask outside"));

console.log("end");
