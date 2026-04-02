Promise.resolve()
  .then(() => {
    console.log("A");
    return new Promise((resolve) => {
      resolve("B");
    });
  })
  .then((value) => {
    console.log(value);
    return Promise.reject("C");
  })
  .catch((error) => {
    console.log(error);
    return "D";
  })
  .then((value) => {
    console.log(value);
  });
