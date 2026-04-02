Promise.resolve()
  .then(() => {
    console.log("A");
    return "B";
  })
  .then((value) => {
    console.log(value);
    throw "C";
  })
  .then(() => {
    console.log("should not run");
  })
  .catch((error) => {
    console.log(error);
  });
