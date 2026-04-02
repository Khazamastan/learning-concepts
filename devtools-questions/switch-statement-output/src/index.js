const input = "2";

switch (input) {
  case 2:
    console.log("number case");
    break;
  case "2":
    console.log("string case");
  default:
    console.log("default block");
}

const status = (() => {
  switch (true) {
    case input === "2" && typeof input === "string":
      return "matched strict string";
    case input == 2:
      return "matched loose equality";
    default:
      return "no match";
  }
})();

console.log(status);
