function init() {
  try {
    return 1;
  } finally {
    return 2;
  }
}

console.log("Return value:", init()); // → 2
