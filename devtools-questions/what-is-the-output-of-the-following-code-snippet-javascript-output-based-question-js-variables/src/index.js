function compute() {
  const condition = true;
  if (condition) {
    let a = false;
    let b = false;
  }
  return {
    a: a || null,
    b: b || null,
  };
}

try {
  const r = compute();
  console.log(r);
} catch (error) {
  console.log('ReferenceError:', error.message);
}
