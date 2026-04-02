const windowLike = { length: 10 };

function callback() {
  console.log(this.length);
}

const obj = {
  length: 5,
  method(fn) {
    fn.call(windowLike);
    arguments[0].call(arguments);
  },
};

obj.method(callback, 1);
