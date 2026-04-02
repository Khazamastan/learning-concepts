/**
 * Title: Asteroid Collision
 * Difficulty: Medium
 * Companies: Amazon, Atlassian
 *
 * Problem Summary:
 * Given an array of integers representing asteroids moving along a line, simulate collisions and return the final state.
 *
 * Solution Explanation:
 * Only right-moving positive asteroids can collide with incoming negative ones; a stack tracks survivors and resolves collisions.
 *
 * Approach Outline:
 * Iterate asteroids, resolving collisions with the stack top while directions oppose. Pop smaller asteroids and push survivors.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(n)
 *
 * Tests:
 *   - assert.deepStrictEqual(asteroidCollision([5,10,-5]), [5,10]);
 *   - assert.deepStrictEqual(asteroidCollision([8,-8]), []);
 *   - assert.deepStrictEqual(asteroidCollision([10,2,-5]), [10]);
 */

function asteroidCollision(asteroids) {
  const stack = [];
  for (const asteroid of asteroids) {
    let alive = true;
    while (alive && asteroid < 0 && stack.length && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];
      if (top < -asteroid) {
        stack.pop();
      } else if (top === -asteroid) {
        stack.pop();
        alive = false;
      } else {
        alive = false;
      }
    }
    if (alive) stack.push(asteroid);
  }
  return stack;
}

module.exports = { asteroidCollision };

if (require.main === module) {
  const assert = require('node:assert/strict');
  assert.deepStrictEqual(asteroidCollision([5,10,-5]), [5,10]);
  assert.deepStrictEqual(asteroidCollision([8,-8]), []);
  assert.deepStrictEqual(asteroidCollision([10,2,-5]), [10]);
  console.log('All tests passed for Asteroid Collision.');
}
