for (var i = 0; i < 3; i += 1) {
  setTimeout(() => console.log("var", i), 0);
}

for (let j = 0; j < 3; j += 1) {
  setTimeout(() => console.log("let", j), 0);
}
