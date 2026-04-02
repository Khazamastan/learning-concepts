# System Design JavaScript Examples

This folder contains runnable JavaScript snippets for common system-design concepts. Each concept lives in its own module under `examples/snippets/` and registers itself with the loader in `examples/systemDesignExamples.js`.

## Prerequisites

1. Install [Node.js](https://nodejs.org/) version 18 or later. (The development environment here does not currently include `node`, so you will need to install it locally before running the snippets.)
2. From the repository root, keep the default folder structure so the loader can auto-discover the snippet files.

## Running an Example

1. Open a terminal at the repository root.
2. Start a Node.js REPL:

   ```bash
   node
   ```

3. Require the loader and invoke any example using its key:

   ```javascript
   const { examples, runExample } = require('./examples/systemDesignExamples');

   // Inspect available keys
   console.log(Object.keys(examples));

   // Execute a specific example
   const result = runExample('caching', 'product-42', id => ({ id, price: 199 }));
   console.log(result);

   // Read the attached use-case description
   console.log(examples.caching.useCase);
   ```

4. For stateful examples, pass any arguments the snippet expects (see the corresponding file under `examples/snippets/<name>.js`).

## Creating New Examples

1. Copy an existing file in `examples/snippets/` as a starting point.
2. Update the call to `register('exampleKey', fn, 'Use case description')` with your logic and description.
3. Save the file—no additional wiring is required. The loader automatically pulls in every `.js` file in the `snippets` directory.

## Troubleshooting

- If `runExample('someKey')` throws `Example "someKey" not found`, ensure the filename ends with `.js`, the key in the snippet matches the name you are using, and the file is located directly inside `examples/snippets/` (subdirectories are not scanned).
- For snippets that rely on async logic, return a promise from your function and `await` the result when calling `runExample`.
