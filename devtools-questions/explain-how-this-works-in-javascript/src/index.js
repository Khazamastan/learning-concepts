function show(label) {
  console.log(label, this?.value);
}

const obj = { value: "object", show };

show("global call");
obj.show("method call");
show.call({ value: "call" }, "call binding");
const bound = show.bind({ value: "bound" });
bound("bind");

const arrow = () => console.log("arrow", this);
const wrapper = {
  value: "wrapper",
  arrow,
};
wrapper.arrow();
