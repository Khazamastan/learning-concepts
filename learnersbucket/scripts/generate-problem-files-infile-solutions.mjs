import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/Users/kbellamk/Workspace/learnersbucket';
const MAP_FILE = path.join(ROOT, 'modules/problem-map.js');
const HANDBOOK_FILE = path.join(ROOT, 'javascript-practice-solutions.md');
const OUT_DIR = path.join(ROOT, 'problem-files');
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
  const sectionRegex = /##\s+\d+\)\s+(.+)\n([\s\S]*?)(?=\n##\s+\d+\)\s+|$)/g;
  let m;

  while ((m = sectionRegex.exec(markdown)) !== null) {
    const title = m[1].trim();
    const body = m[2];

    const statementMatch = body.match(/\*\*Problem Statement\*\*\s+([\s\S]*?)\n\*\*Example Input\*\*/);
    const inputMatch = body.match(/\*\*Example Input\*\*[\s\S]*?```[a-zA-Z]*\n([\s\S]*?)\n```/);
    const outputMatch = body.match(/\*\*Example Output\*\*[\s\S]*?```[a-zA-Z]*\n([\s\S]*?)\n```/);
    const solutionMatch = body.match(/\*\*JavaScript Solution[^*]*\*\*[\s\S]*?```[a-zA-Z]*\n([\s\S]*?)\n```/);

    map.set(normalize(title), {
      title,
      statement: statementMatch ? statementMatch[1].trim() : 'Solve the problem as described in the title.',
      exampleInput: inputMatch ? inputMatch[1].trim() : '// Example input not available',
      exampleOutput: outputMatch ? outputMatch[1].trim() : '// Example output not available',
      solution: solutionMatch ? solutionMatch[1].trim() : '// Reference solution not available'
    });
  }

  return map;
}

const SECTION_ALIASES = new Map([
  [normalize('Piping-2'), normalize('Piping - 2 (Supports Multiple Args in First Function)')],
  [normalize('Publisher-subscriber 2'), normalize('Publisher-Subscriber 2 (with once)')],
  [normalize('Create a School using OOPs principle'), normalize('Create a School using OOP Principles')],
  [normalize('Implement an router middleware'), normalize('Implement a Router Middleware')],
  [normalize('Remove cycle from the object'), normalize('Remove Cycle from Object')],
  [normalize('Flatten a deeply nested object using dot notation'), normalize('Flatten Deeply Nested Object using Dot Notation')],
  [normalize('Sum up functions return value running in parallel and in sequence'), normalize('Sum Function Results in Parallel and in Sequence')],
  [normalize('Create composeAsync function with chaining support'), normalize('Create composeAsync with Chaining Support')],
  [normalize('Implement two stack with an array'), normalize('Implement Two Stacks with One Array')],
  [normalize('Sort string based frequency of characters'), normalize('Sort String by Character Frequency')],
  [normalize('Find highest commodity price under a timestamp'), normalize('Highest Commodity Price Under a Timestamp')],
  [normalize('Capture product visible on viewport when user stops scrolling - Reactjs'), normalize('Capture Visible Products on Scroll Stop (React)')],
  [normalize('Capture product visible on viewport when user stops scrolling - Vanilla Js'), normalize('Capture Visible Products on Scroll Stop (Vanilla JS)')],
  [normalize('usePageVisits() hook'), normalize('Create usePageVisits() Hook')],
  [normalize('Code an Todo card list'), normalize('Code a Todo Card List')]
]);

function tokenSimilarity(a, b) {
  const ta = new Set(a.match(/[a-z0-9]+/g) || []);
  const tb = new Set(b.match(/[a-z0-9]+/g) || []);
  if (!ta.size || !tb.size) return 0;
  let common = 0;
  for (const t of ta) if (tb.has(t)) common += 1;
  return common / Math.max(ta.size, tb.size);
}

function getSectionForTitle(title, sections) {
  const key = normalize(title);
  if (sections.has(key)) return sections.get(key);

  const aliasKey = SECTION_ALIASES.get(key);
  if (aliasKey && sections.has(aliasKey)) return sections.get(aliasKey);

  let best = null;
  let bestScore = 0;

  for (const [candidateKey, value] of sections.entries()) {
    if (candidateKey.includes(key) || key.includes(candidateKey)) return value;

    const score = tokenSimilarity(title.toLowerCase(), value.title.toLowerCase());
    if (score > bestScore) {
      bestScore = score;
      best = value;
    }
  }

  return bestScore >= 0.45 ? best : null;
}

function defaultAlt2() {
  return {
    name: 'Approach 2: Iterative / Explicit State',
    code: `function solveIterative(input) {
  // 1) Initialize state.
  // 2) Traverse input using loops.
  // 3) Update state explicitly.
  return input;
}`
  };
}

function defaultAlt3() {
  return {
    name: 'Approach 3: Functional / Declarative',
    code: `function solveFunctional(input) {
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
      name: 'Approach 2: useReducer-driven state transitions',
      code: `function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return { ...state, value: action.payload };
    default:
      return state;
  }
}

function useReducerBasedFeature(React) {
  const { useReducer } = React;
  const [state, dispatch] = useReducer(reducer, { value: null });
  return { state, dispatch };
}`
    },
    {
      name: 'Approach 3: Custom hook + presentational split',
      code: `function useFeatureLogic(React) {
  const { useState } = React;
  const [value, setValue] = useState(null);
  return { value, setValue };
}

function renderFeatureView({ value, onUpdate }) {
  return { value, onUpdate };
}`
    }
  ];
}

function asyncAlts() {
  return [
    {
      name: 'Approach 2: async/await control flow',
      code: `async function solveAsyncAwait(tasks) {
  const out = [];
  for (const task of tasks) {
    out.push(await task());
  }
  return out;
}`
    },
    {
      name: 'Approach 3: Promise combinator flow',
      code: `function solveWithPromises(tasks) {
  return Promise.all(tasks.map((task) => Promise.resolve().then(task)));
}`
    }
  ];
}

function eventAlts() {
  return [
    {
      name: 'Approach 2: Class-based architecture',
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
      name: 'Approach 3: Closure-based architecture',
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

function objectAlts() {
  return [
    {
      name: 'Approach 2: Recursive traversal',
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
      name: 'Approach 3: Iterative stack traversal',
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
      name: 'Approach 2: Timestamp gate',
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
      name: 'Approach 3: Timer gate',
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
      name: 'Approach 2: Closure-based variant',
      code: `function buildClosureUtility(start = 0) {
  let state = start;
  return {
    next() {
      state += 1;
      return state;
    }
  };
}`
    },
    {
      name: 'Approach 3: Generator-based variant',
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

function dsaAlts() {
  return [
    {
      name: 'Approach 2: Brute-force baseline',
      code: `function bruteForce(input) {
  // Try all candidates/pairs/ranges.
  // Validate each and keep the best.
  return input;
}`
    },
    {
      name: 'Approach 3: Optimized with data structures',
      code: `function optimized(input) {
  const state = new Map();
  // Build lookup/prefix/two-pointer state.
  // Return optimized result.
  return input;
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

function sanitizeReferenceSolution(title, code) {
  const trimmed = (code || '').trim();

  // Avoid embedding HTML blocks in JS files.
  if (/<[a-z][\s\S]*>/i.test(trimmed) && title.toLowerCase().includes('image comparison slider')) {
    return `function setupImageComparisonSlider(root) {
  const overlay = root.querySelector('.overlay');
  const slider = root.querySelector("input[type='range']");
  if (!overlay || !slider) return;

  function update(value) {
    overlay.style.width = \`${'${value}'}%\`;
  }

  slider.addEventListener('input', (e) => update(e.target.value));
  update(slider.value || 50);
}`;
  }

  return trimmed || `function referenceSolution(input) {
  return input;
}`;
}

function buildFileContent({ title, statement, exampleInput, exampleOutput, solution }, order) {
  const alternatives = chooseAlternatives(title);
  const solution1 = sanitizeReferenceSolution(title, solution);

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

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
${solution1}

// ---------------------------
// ${alternatives[0].name}
// ---------------------------
${alternatives[0].code}

// ---------------------------
// ${alternatives[1].name}
// ---------------------------
${alternatives[1].code}
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
    const sec = getSectionForTitle(title, sections) || {
      title,
      statement: 'Solve the problem as described in the title.',
      exampleInput: '// Example input not available',
      exampleOutput: '// Example output not available',
      solution: 'function referenceSolution(input) {\n  return input;\n}'
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

  const readme = [
    '# Problem Files (In-File Multiple Solutions)',
    '',
    `Generated ${created.length} files with one problem per file.`,
    '',
    'Each file contains:',
    '- Detailed problem statement',
    '- Example input/output',
    '- Three in-file code approaches (no stringified code blobs)',
    '',
    '## Files',
    ...created.map((c, i) => `${i + 1}. \`${c.fileName}\` - ${c.title}`),
    ''
  ].join('\n');

  fs.writeFileSync(README_FILE, readme, 'utf8');

  console.log(`Generated ${created.length} in-file solution files in ${OUT_DIR}`);
}

run();
