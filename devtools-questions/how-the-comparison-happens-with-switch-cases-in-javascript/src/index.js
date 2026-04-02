/**
 * Demonstrates that switch statements in JavaScript rely on strict equality (===).
 * The logs show which case executes when the expression and case labels differ
 * by type, even when they look similar.
 */

function evaluate(value) {
  switch (value) {
    case 1:
      return 'Matched number 1';
    case '1':
      return 'Matched string "1"';
    default:
      return 'No match';
  }
}

const demoValues = [1, '1', true, 0];
for (const input of demoValues) {
  console.log(`${JSON.stringify(input)} → ${evaluate(input)}`);
}

console.log('\nNote: switch uses === so only the case with the same type fires.');
