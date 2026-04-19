import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/Users/kbellamk/Workspace/learnersbucket';
const MAP_FILE = path.join(ROOT, 'modules/problem-map.js');
const HANDBOOK_FILE = path.join(ROOT, 'javascript-practice-solutions.md');
const OUT_DIR = path.join(ROOT, 'problem-files');
const INDEX_FILE = path.join(OUT_DIR, 'index.js');
const README_FILE = path.join(OUT_DIR, 'README.md');

function normalize(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function escTemplate(text) {
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

function parseProblemTitlesFromMap(mapText) {
  const lines = mapText.split('\n');
  const out = [];

  for (const line of lines) {
    const match = line.match(/^\s*(?:'([^']+)'|([A-Za-z][^:]+)):\s*\[/);
    if (!match) continue;
    const title = (match[1] || match[2] || '').trim();
    if (title) out.push(title);
  }

  return out;
}

function parseSections(markdown) {
  const map = new Map();
  const sectionRegex = /^##\s+\d+\)\s+(.+)\n([\s\S]*?)(?=^##\s+\d+\)\s+|\Z)/gm;
  let m;

  while ((m = sectionRegex.exec(markdown)) !== null) {
    const title = m[1].trim();
    const body = m[2];

    const statementMatch = body.match(/\*\*Problem Statement\*\*\s+([\s\S]*?)\n\*\*Example Input\*\*/);
    const statement = statementMatch ? statementMatch[1].trim() : 'Solve the problem as described in the title.';

    const inputMatch = body.match(/\*\*Example Input\*\*[\s\S]*?```[a-zA-Z]*\n([\s\S]*?)\n```/);
    const outputMatch = body.match(/\*\*Example Output\*\*[\s\S]*?```[a-zA-Z]*\n([\s\S]*?)\n```/);
    const solutionMatch = body.match(/\*\*JavaScript Solution[^*]*\*\*[\s\S]*?```[a-zA-Z]*\n([\s\S]*?)\n```/);

    map.set(normalize(title), {
      title,
      statement,
      exampleInput: inputMatch ? inputMatch[1].trim() : '// Example input not available',
      exampleOutput: outputMatch ? outputMatch[1].trim() : '// Example output not available',
      solution: solutionMatch ? solutionMatch[1].trim() : '// Reference solution not available'
    });
  }

  return map;
}

function defaultAlt2() {
  return {
    name: 'Approach 2: Iterative / Explicit State',
    notes: 'Use loops and explicit state variables. This style is easier to debug and reason about step-by-step.',
    code: `function solveIterative(input) {
  // 1) Initialize result and state.
  // 2) Traverse input using for/while loops.
  // 3) Update state explicitly.
  // 4) Return final result.
  return input;
}`
  };
}

function defaultAlt3() {
  return {
    name: 'Approach 3: Functional / Declarative',
    notes: 'Use map/filter/reduce and helper functions. This style is compact and composable.',
    code: `function solveFunctional(input) {
  // Example skeleton for declarative style.
  return Array.isArray(input)
    ? input.reduce((acc, item) => {
        acc.push(item);
        return acc;
      }, [])
    : input;
}`
  };
}

function reactAlts() {
  return [
    {
      name: 'Approach 2: useReducer-based state management',
      notes: 'Prefer this when state transitions are non-trivial and you want predictable updates.',
      code: `import React, { useReducer } from 'react';

const initialState = { value: null };

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return { ...state, value: action.payload };
    default:
      return state;
  }
}

export function ComponentWithReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <button onClick={() => dispatch({ type: 'update', payload: Date.now() })}>
      {String(state.value)}
    </button>
  );
}`
    },
    {
      name: 'Approach 3: Custom hook + presentational component split',
      notes: 'Separate logic from UI for better testability and reuse.',
      code: `import React, { useState } from 'react';

function useFeatureLogic() {
  const [state, setState] = useState(null);
  const update = (next) => setState(next);
  return { state, update };
}

function FeatureView({ state, onUpdate }) {
  return <button onClick={() => onUpdate(Date.now())}>{String(state)}</button>;
}

export function FeatureContainer() {
  const { state, update } = useFeatureLogic();
  return <FeatureView state={state} onUpdate={update} />;
}`
    }
  ];
}

function asyncAlts() {
  return [
    {
      name: 'Approach 2: async/await control flow',
      notes: 'Prefer this style for readability when chaining async operations.',
      code: `async function solveAsyncAwait(tasks) {
  const out = [];
  for (const task of tasks) {
    out.push(await task());
  }
  return out;
}`
    },
    {
      name: 'Approach 3: Promise combinator style',
      notes: 'Use Promise.all / Promise.race / Promise.any depending on requirement.',
      code: `function solveWithPromises(tasks) {
  return Promise.all(tasks.map((task) => Promise.resolve().then(task)));
}`
    }
  ];
}

function eventAlts() {
  return [
    {
      name: 'Approach 2: Class-based event architecture',
      notes: 'Encapsulates state and supports inheritance.',
      code: `class Emitter {
  constructor() {
    this.events = new Map();
  }

  on(event, cb) {
    if (!this.events.has(event)) this.events.set(event, new Set());
    this.events.get(event).add(cb);
    return () => this.off(event, cb);
  }

  off(event, cb) {
    this.events.get(event)?.delete(cb);
  }

  emit(event, ...args) {
    this.events.get(event)?.forEach((cb) => cb(...args));
  }
}`
    },
    {
      name: 'Approach 3: Closure-based lightweight implementation',
      notes: 'Good for small utilities where class abstraction is unnecessary.',
      code: `function createEmitter() {
  const map = new Map();
  return {
    on(event, cb) {
      if (!map.has(event)) map.set(event, new Set());
      map.get(event).add(cb);
      return () => map.get(event)?.delete(cb);
    },
    emit(event, ...args) {
      map.get(event)?.forEach((cb) => cb(...args));
    }
  };
}`
    }
  ];
}

function dsaAlts() {
  return [
    {
      name: 'Approach 2: Brute force baseline',
      notes: 'Simplest to write first; usually higher time complexity but useful for validation.',
      code: `function bruteForce(input) {
  // Try every candidate / pair / range as needed.
  // Validate each candidate and track the best answer.
  return input;
}`
    },
    {
      name: 'Approach 3: Optimized data-structure approach',
      notes: 'Use hash maps, sets, sorting, two pointers, or prefix sums to improve complexity.',
      code: `function optimized(input) {
  const state = new Map();
  // Build state in one pass.
  // Query/update state in O(1) average time.
  return input;
}`
    }
  ];
}

function objectAlts() {
  return [
    {
      name: 'Approach 2: Recursive DFS traversal',
      notes: 'Natural for nested structures and trees.',
      code: `function recursiveTransform(node) {
  if (node === null || typeof node !== 'object') return node;
  const out = Array.isArray(node) ? [] : {};
  for (const key of Object.keys(node)) {
    out[key] = recursiveTransform(node[key]);
  }
  return out;
}`
    },
    {
      name: 'Approach 3: Iterative stack/queue traversal',
      notes: 'Avoids deep recursion limits and provides explicit traversal control.',
      code: `function iterativeTransform(root) {
  if (root === null || typeof root !== 'object') return root;
  const out = Array.isArray(root) ? [] : {};
  const stack = [{ src: root, dst: out }];

  while (stack.length) {
    const { src, dst } = stack.pop();
    for (const key of Object.keys(src)) {
      const value = src[key];
      if (value && typeof value === 'object') {
        dst[key] = Array.isArray(value) ? [] : {};
        stack.push({ src: value, dst: dst[key] });
      } else {
        dst[key] = value;
      }
    }
  }

  return out;
}`
    }
  ];
}

function timingAlts() {
  return [
    {
      name: 'Approach 2: Timestamp-based control',
      notes: 'Useful for throttle-like behavior with low overhead.',
      code: `function createTimedHandler(fn, wait) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn(...args);
    }
  };
}`
    },
    {
      name: 'Approach 3: Timer-based control',
      notes: 'Useful for debounce-like behavior and trailing execution.',
      code: `function createDeferredHandler(fn, wait) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}`
    }
  ];
}

function functionalAlts() {
  return [
    {
      name: 'Approach 2: Closure + minimal mutable state',
      notes: 'Encapsulate state privately and expose small API surface.',
      code: `function buildUtility() {
  let state = 0;
  return {
    next() {
      state += 1;
      return state;
    }
  };
}`
    },
    {
      name: 'Approach 3: Generator-based implementation',
      notes: 'Generators can model incremental computation elegantly.',
      code: `function* createGenerator(start = 0) {
  let value = start;
  while (true) {
    yield value;
    value += 1;
  }
}`
    }
  ];
}

function chooseAlternatives(title) {
  const t = title.toLowerCase();

  if (/react|hook|component|modal|carousel|autocomplete|stepper|scroll indicator|todo card|todo list|page visits|switch-case|timer state/.test(t)) {
    return reactAlts();
  }

  if (/promise|async|maplimit|callbacks queue|composeasync|parallel and in sequence/.test(t)) {
    return asyncAlts();
  }

  if (/publisher|subscriber|router middleware|analytics sdk|clearalltimeout/.test(t)) {
    return eventAlts();
  }

  if (/cycle|hex|object value|string path|filter nested object|dot notation/.test(t)) {
    return objectAlts();
  }

  if (/debouncing|throttling|sampling/.test(t)) {
    return timingAlts();
  }

  if (/polyfill|iterator|groupby|memoize/.test(t)) {
    return [defaultAlt2(), defaultAlt3()];
  }

  if (/longest consecutive|subarrays|queue|history|frequency|caesar|linked list|two stack|overlapping circles|trapping rain|tic-tac-toe|deque|digital root|highest commodity|text justification|iterate n-array/.test(t)) {
    return dsaAlts();
  }

  if (/currying|piping|method chaining|toggle|flatten an array/.test(t)) {
    return functionalAlts();
  }

  return [defaultAlt2(), defaultAlt3()];
}

function buildFileContent({ title, statement, exampleInput, exampleOutput, solution }, order) {
  const alternatives = chooseAlternatives(title);

  const solutions = [
    {
      name: 'Approach 1: Reference solution',
      notes: 'Direct implementation from the practice handbook.',
      code: solution
    },
    ...alternatives
  ];

  const serializedSolutions = solutions
    .map((s) => {
      return `  {\n    name: \`${escTemplate(s.name)}\`,\n    notes: \`${escTemplate(s.notes)}\`,\n    code: \`\n${escTemplate(s.code)}\n\`.trim()\n  }`;
    })
    .join(',\n');

  return `/**
 * Problem #${order}: ${title}
 *
 * Detailed Problem Statement:
 * ${statement.split('\n').join('\n * ')}
 *
 * Example Input:
 * ${exampleInput.split('\n').join('\n * ')}
 *
 * Example Output:
 * ${exampleOutput.split('\n').join('\n * ')}
 */

export const problem = \`${escTemplate(title)}\`;

export const statement = \`
${escTemplate(statement)}
\`.trim();

export const exampleInput = \`
${escTemplate(exampleInput)}
\`.trim();

export const exampleOutput = \`
${escTemplate(exampleOutput)}
\`.trim();

export const solutions = [
${serializedSolutions}
];
`;
}

function run() {
  const mapText = fs.readFileSync(MAP_FILE, 'utf8');
  const markdown = fs.readFileSync(HANDBOOK_FILE, 'utf8');

  const titles = parseProblemTitlesFromMap(mapText);
  const sections = parseSections(markdown);

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const created = [];

  titles.forEach((title, idx) => {
    const key = normalize(title);
    const sec = sections.get(key) || {
      title,
      statement: 'Solve the problem as described in the title.',
      exampleInput: '// Example input not available',
      exampleOutput: '// Example output not available',
      solution: '// Reference solution not available'
    };

    const order = String(idx + 1).padStart(2, '0');
    const fileName = `${order}-${slugify(title)}.js`;
    const filePath = path.join(OUT_DIR, fileName);

    const content = buildFileContent(
      {
        title,
        statement: sec.statement,
        exampleInput: sec.exampleInput,
        exampleOutput: sec.exampleOutput,
        solution: sec.solution
      },
      idx + 1
    );

    fs.writeFileSync(filePath, content, 'utf8');
    created.push({ title, fileName });
  });

  const indexLines = created
    .map((c) => `export * as ${slugify(c.title).replace(/-/g, '_')} from './${c.fileName}';`)
    .join('\n');

  fs.writeFileSync(INDEX_FILE, `${indexLines}\n`, 'utf8');

  const readme = [
    '# Problem Files',
    '',
    `Generated ${created.length} files with one problem per file.`,
    '',
    'Each file contains:',
    '- Detailed problem statement',
    '- Example input/output',
    '- 3 approaches: reference + 2 alternatives',
    '',
    '## Files',
    ...created.map((c, i) => `${i + 1}. \`${c.fileName}\` - ${c.title}`),
    ''
  ].join('\n');

  fs.writeFileSync(README_FILE, readme, 'utf8');

  console.log(`Generated ${created.length} problem files in ${OUT_DIR}`);
}

run();
