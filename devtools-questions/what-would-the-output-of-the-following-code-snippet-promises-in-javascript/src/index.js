Promise.resolve(1)
  .then((value) => {
    console.log("A", value);
    return value + 1;
  })
  .finally(() => {
    console.log("B");
  })
  .then((value) => {
    console.log("C", value);
    return Promise.reject("boom");
  })
  .catch((error) => {
    console.log("D", error);
    return 42;
  })
  .then((value) => {
    console.log("E", value);
  });
