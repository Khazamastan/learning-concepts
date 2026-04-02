/**
 * Demonstrates the three JavaScript keywords that create bindings: var, let, const.
 * Each declaration has different scoping and mutability rules, which the logs highlight.
 */

function demo() {
  var legacy = 'var is function scoped and allows redeclaration';
  let modern = 'let is block scoped and mutable';
  const constant = 'const is block scoped and immutable binding';

  console.log(legacy);
  console.log(modern);
  console.log(constant);

  // `var` allows redeclaration in the same scope.
  var legacy = 'var can be redeclared';
  console.log(legacy);

  // `let` can be reassigned but not redeclared in the same scope.
  modern = 'let can change value but not be redeclared';
  console.log(modern);

  // Attempting to reassign const would throw; we show it in a guarded way.
  try {
    // eslint-disable-next-line no-const-assign
    // @ts-ignore - intentional error demonstration
    constant = 'This line never runs.';
  } catch (error) {
    console.log('Reassigning const throws:', error.message);
  }
}

demo();
