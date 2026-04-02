import { createTaskRunner } from './taskRunner.js';

const run = createTaskRunner(2);

async function simulatedTask(label, delay) {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return `${label} done after ${delay}ms`;
}

await Promise.all([
  run(() => simulatedTask('Task A', 300)),
  run(() => simulatedTask('Task B', 200)),
  run(() => simulatedTask('Task C', 100)),
  run(() => simulatedTask('Task D', 50)),
]).then((results) => {
  console.log(results);
});
