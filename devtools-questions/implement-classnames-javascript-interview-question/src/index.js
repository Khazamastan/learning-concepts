export function classNames(...args) {
  const classes = new Set();
  for (const arg of args) {
    if (!arg) continue;
    if (typeof arg === "string") {
      arg
        .split(/\s+/)
        .filter(Boolean)
        .forEach((token) => classes.add(token));
    } else if (Array.isArray(arg)) {
      arg.forEach((value) => {
        const valueClasses = classNames(value);
        valueClasses
          .split(/\s+/)
          .filter(Boolean)
          .forEach((token) => classes.add(token));
      });
    } else if (typeof arg === "object" && !Array.isArray(arg)) {
      Object.entries(arg).forEach(([key, value]) => {
        if (value) classes.add(key);
      });
    }
  }
  return [...classes].join(" ");
}

console.log(classNames("btn", "btn", ["primary", null, ["rounded"]], { active: true, disabled: false }));
