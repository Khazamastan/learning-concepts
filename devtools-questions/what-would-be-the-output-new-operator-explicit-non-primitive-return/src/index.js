function Widget(label) {
  this.label = label;
  return { label: label.toUpperCase(), version: 1 };
}

const widget = new Widget("alpha");
console.log(widget.label);
console.log(widget instanceof Widget);
console.log(Object.keys(widget));
