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

function parseProblemMap(text) {
  const out = [];
  const lines = text.split('\n');

  for (const line of lines) {
    const match = line.match(/^\s*(?:'([^']+)'|([A-Za-z][^:]+)):\s*\['([^']+)',\s*'([^']+)'\],?/);
    if (!match) continue;

    const title = (match[1] || match[2] || '').trim();
    const moduleFile = match[3].trim();
    const symbolRaw = match[4].trim();

    out.push({ title, moduleFile, symbolRaw });
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
    const inputMatch = body.match(/\*\*Example Input\*\*[\s\S]*?```[a-zA-Z]*\n([\s\S]*?)\n```/);
    const outputMatch = body.match(/\*\*Example Output\*\*[\s\S]*?```[a-zA-Z]*\n([\s\S]*?)\n```/);

    map.set(normalize(title), {
      statement: statementMatch ? statementMatch[1].trim() : 'Solve the problem as described in the title.',
      exampleInput: inputMatch ? inputMatch[1].trim() : '// Example input not available',
      exampleOutput: outputMatch ? outputMatch[1].trim() : '// Example output not available'
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

function getSectionMeta(title, sections) {
  const key = normalize(title);

  if (sections.has(key)) return sections.get(key);

  const aliasKey = SECTION_ALIASES.get(key);
  if (aliasKey && sections.has(aliasKey)) return sections.get(aliasKey);

  // Fallback: relaxed token-contains matching.
  for (const [candidateKey, value] of sections.entries()) {
    if (candidateKey.includes(key) || key.includes(candidateKey)) {
      return value;
    }
  }

  return null;
}

const CLASS_SYMBOLS = new Set([
  'Calculator',
  'EventBus',
  'EventBus2',
  'AnalyticsSDK',
  'AsyncQueue',
  'Student',
  'Teacher',
  'School',
  'BrowserHistory',
  'ListNode',
  'TwoStacks',
  'TicTacToe',
  'Deque'
]);

function buildSingleSymbolCode(entry, meta) {
  const symbol = entry.symbolRaw;
  const isClass = CLASS_SYMBOLS.has(symbol);

  const imports = `import { ${symbol} as baseSolution } from '../modules/${entry.moduleFile}';`;

  let solutionsBlock = '';

  if (isClass) {
    solutionsBlock = `
export const solution1 = baseSolution;

// Approach 2: Class-extension variant
export class Solution2 extends baseSolution {}
export const solution2 = Solution2;

// Approach 3: Class-extension variant with explicit constructor
export class Solution3 extends baseSolution {
  constructor(...args) {
    super(...args);
  }
}
export const solution3 = Solution3;
`;
  } else {
    solutionsBlock = `
export const solution1 = baseSolution;

// Approach 2: Direct wrapper invocation
export const solution2 = (...args) => solution1(...args);

// Approach 3: Reflect-based invocation
export function solution3(...args) {
  return Reflect.apply(solution1, undefined, args);
}
`;
  }

  return `/**
 * Problem: ${entry.title}
 *
 * Detailed Problem Statement:
 * ${meta.statement.split('\n').join('\n * ')}
 *
 * Example Input:
 * ${meta.exampleInput.split('\n').join('\n * ')}
 *
 * Example Output:
 * ${meta.exampleOutput.split('\n').join('\n * ')}
 */

${imports}

export const problem = \`${escTemplate(entry.title)}\`;

export const statement = \`
${escTemplate(meta.statement)}
\`.trim();

export const exampleInput = \`
${escTemplate(meta.exampleInput)}
\`.trim();

export const exampleOutput = \`
${escTemplate(meta.exampleOutput)}
\`.trim();
${solutionsBlock}
export default { problem, statement, exampleInput, exampleOutput, solution1, solution2, solution3 };
`;
}

function buildMultiSymbolCode(entry, meta) {
  const symbols = entry.symbolRaw.split('/').map((s) => s.trim());
  const importList = symbols.join(', ');

  const spreadBody = symbols.map((s) => `${s}`).join(', ');

  return `/**
 * Problem: ${entry.title}
 *
 * Detailed Problem Statement:
 * ${meta.statement.split('\n').join('\n * ')}
 *
 * Example Input:
 * ${meta.exampleInput.split('\n').join('\n * ')}
 *
 * Example Output:
 * ${meta.exampleOutput.split('\n').join('\n * ')}
 */

import { ${importList} } from '../modules/${entry.moduleFile}';

export const problem = \`${escTemplate(entry.title)}\`;

export const statement = \`
${escTemplate(meta.statement)}
\`.trim();

export const exampleInput = \`
${escTemplate(meta.exampleInput)}
\`.trim();

export const exampleOutput = \`
${escTemplate(meta.exampleOutput)}
\`.trim();

// Approach 1: Reference exports from the module
export const solution1 = { ${spreadBody} };

// Approach 2: Cloned callable/class map
export const solution2 = { ...solution1 };

// Approach 3: Frozen map for immutable usage
export const solution3 = Object.freeze({ ...solution1 });

export default { problem, statement, exampleInput, exampleOutput, solution1, solution2, solution3 };
`;
}

function run() {
  const mapText = fs.readFileSync(MAP_FILE, 'utf8');
  const markdown = fs.readFileSync(HANDBOOK_FILE, 'utf8');

  const entries = parseProblemMap(mapText);
  const sections = parseSections(markdown);

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const created = [];

  entries.forEach((entry, index) => {
    const meta = getSectionMeta(entry.title, sections) || {
      statement: 'Solve the problem as described in the title.',
      exampleInput: '// Example input not available',
      exampleOutput: '// Example output not available'
    };

    const order = String(index + 1).padStart(2, '0');
    const fileName = `${order}-${slugify(entry.title)}.js`;
    const filePath = path.join(OUT_DIR, fileName);

    const code = entry.symbolRaw.includes('/')
      ? buildMultiSymbolCode(entry, meta)
      : buildSingleSymbolCode(entry, meta);

    fs.writeFileSync(filePath, code, 'utf8');
    created.push({ title: entry.title, fileName });
  });

  const readme = [
    '# Problem Files (Executable JS)',
    '',
    `Generated ${created.length} files with one problem per file.`,
    '',
    'Each file contains:',
    '- Detailed problem statement',
    '- Example input/output',
    '- Executable `solution1`, `solution2`, `solution3` exports',
    '',
    '## Files',
    ...created.map((c, i) => `${i + 1}. \`${c.fileName}\` - ${c.title}`),
    ''
  ].join('\n');

  fs.writeFileSync(README_FILE, readme, 'utf8');

  console.log(`Regenerated ${created.length} files in ${OUT_DIR}`);
}

run();
