function demo() {
  try {
    console.log(count);
  } catch (error) {
    console.log(error.name);
  }

  let count = 1;
  console.log(count);
}

demo();

try {
  console.log(outside);
} catch (error) {
  console.log(error.name);
}

const outside = 5;
