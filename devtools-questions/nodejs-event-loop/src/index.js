function performNextTick() {
  process.nextTick(() => {
    console.log("Inside nextTick | outside setTimeout");
    setTimeout(() => {
      console.log("Inside nextTick | Inside setTimeout");
      process.exit(0);
    }, 0);
  });
}

setInterval(() => {
  console.log("setInterval");
}, 0);

performNextTick();
