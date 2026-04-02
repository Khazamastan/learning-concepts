import { countFunctionParameters } from './countFunctionParameters.js';

function example(a, b, c = 1, ...rest) {
  return a + b + c + rest.length;
}

console.log(countFunctionParameters(example));
