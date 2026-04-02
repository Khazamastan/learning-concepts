let x = 1;

do {
  let y = --x;
  console.log(x++ + --y);
} while (x++ < 5);
