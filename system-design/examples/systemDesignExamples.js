const fs = require('fs');
const path = require('path');

const examples = {};

function defineExample(key, fn, useCase) {
  examples[key] = fn;
  examples[key].useCase = useCase;
}

const snippetsDir = path.join(__dirname, 'snippets');

for (const file of fs.readdirSync(snippetsDir).sort()) {
  if (file.endsWith('.js')) {
    const register = require(path.join(snippetsDir, file));
    register(defineExample);
  }
}

function runExample(key, ...args) {
  const entry = examples[key];
  if (!entry) {
    throw new Error('Example "' + key + '" not found.');
  }
  return entry(...args);
}

module.exports = {
  examples,
  runExample,
};
