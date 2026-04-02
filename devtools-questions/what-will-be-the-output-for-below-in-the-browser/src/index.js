const windowLike = { tag: "window" };

(function () {
  "use strict";

  const describe = (context) => (context ? context.tag || "object" : context);

  const foo = {
    tag: "foo",
    barX: function () {
      console.log(describe(this));
    },
    barY: () => {
      console.log(describe(this));
    },
  };

  const barX = foo.barX;
  const barY = foo.barY;

  foo.barX();
  foo.barY();
  barX();
  barY();
}).call(windowLike);
