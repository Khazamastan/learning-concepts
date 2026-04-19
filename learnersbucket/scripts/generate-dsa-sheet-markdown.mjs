import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = '/Users/kbellamk/Workspace/learnersbucket';
const INPUT_FILE = path.join(ROOT, 'dsa-sheet-solutions.js');
const OUTPUT_FILE = path.join(ROOT, 'dsa-sheet-solutions.md');

function splitParams(raw = '') {
  return raw
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
}

function toTitle(name) {
  return name
    .replace(/_/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
}

function sampleValue(param) {
  const p = param.toLowerCase();

  if (/guess|isbadversion/.test(p)) return 'fn';
  if (/root|node/.test(p)) return 'treeRoot';
  if (/head|list|l1|l2/.test(p)) return 'linkedListHead';
  if (/graph/.test(p)) return '[[1], [2], []]';
  if (/grid|matrix|board/.test(p)) return '[[1, 2], [3, 4]]';
  if (/edges|roads|flights|connections|tickets|trips/.test(p)) return '[[0, 1], [1, 2]]';
  if (/nums|arr|array|prices|ratings|stones|temps|heights|cost|coins|gas/.test(p)) return '[1, 2, 3]';
  if (/s\d*|str|string|word|needle|haystack|digits|jewels|stones|a|b|x/.test(p)) return '"abc"';
  if (/k|n|m|target|val|amount|capacity|src|dst/.test(p)) return '2';
  return '...';
}

function outputHint(name, kind) {
  if (kind === 'class') return 'instance behaves as required by operations';
  if (/^(is|has|can)/.test(name)) return 'true or false';
  if (/(count|num|length|max|min|sum|profit|cost|kth|peak|sqrt|paths|depth|diameter|change)/i.test(name)) {
    return 'number';
  }
  if (/(string|decode|prefix|words|palindrome|reorganize|match|say)/i.test(name)) return 'string';
  if (/(list|array|subsets|permute|combine|order|view|elements|temperatures|anagrams|range|path|traversal|topk|labels)/i.test(name)) {
    return 'array / list structure';
  }
  return 'result according to problem definition';
}

function generateExamples(name, params, kind) {
  if (kind === 'class') {
    return [
      {
        input: `const obj = new ${name}(...); // call class methods in sequence`,
        output: 'Methods return/update state according to problem rules'
      },
      {
        input: `Use ${name} with edge state (empty/single element cases)`,
        output: 'Should still follow expected behavior without errors'
      }
    ];
  }

  const args = params.map((p) => sampleValue(p));
  const call = `${name}(${args.join(', ')})`;
  const out = outputHint(name, kind);

  const edgeArgs = params.map((p) => {
    const lower = p.toLowerCase();
    if (/nums|arr|array|prices|ratings|coins|cost/.test(lower)) return '[]';
    if (/grid|matrix|board/.test(lower)) return '[[]]';
    if (/s\d*|str|string|word|needle|haystack|digits/.test(lower)) return '""';
    if (/k|n|m|target|val|amount|capacity/.test(lower)) return '0';
    if (/root|head|node|list|l1|l2/.test(lower)) return 'null';
    return '...';
  });

  return [
    {
      input: call,
      output: out
    },
    {
      input: `${name}(${edgeArgs.join(', ')})`,
      output: 'handles boundary/edge case correctly'
    }
  ];
}

function parseSections(source) {
  const sections = [{ index: 0, title: 'Common Helpers' }];
  const re = /^\s*\*\s*(\d+)\)\s+(.+)$/gm;
  let m;
  while ((m = re.exec(source)) !== null) {
    sections.push({
      index: m.index,
      title: `${m[1]}) ${m[2].trim()}`
    });
  }
  return sections.sort((a, b) => a.index - b.index);
}

function parseDeclarations(source) {
  const out = [];

  const funcRe = /^function\s+([A-Za-z_$][\w$]*)\s*\(([^)]*)\)\s*\{/gm;
  let m;
  while ((m = funcRe.exec(source)) !== null) {
    out.push({
      kind: 'function',
      name: m[1],
      params: splitParams(m[2]),
      index: m.index
    });
  }

  const classRe = /^class\s+([A-Za-z_$][\w$]*)\s*\{/gm;
  while ((m = classRe.exec(source)) !== null) {
    out.push({
      kind: 'class',
      name: m[1],
      params: [],
      index: m.index
    });
  }

  return out.sort((a, b) => a.index - b.index);
}

function parseExportedNames(source) {
  const match = source.match(/export\s*\{([\s\S]*?)\};/m);
  if (!match) return new Set();
  return new Set(
    match[1]
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean)
  );
}

function nearestBoundaryAfter(idx, boundaries) {
  for (const b of boundaries) {
    if (b > idx) return b;
  }
  return null;
}

function buildBlocks(source, declarations, sectionIndices, exportIndex) {
  const declIndices = declarations.map((d) => d.index);
  const boundaries = [...declIndices, ...sectionIndices, exportIndex]
    .filter((x) => Number.isInteger(x) && x >= 0)
    .sort((a, b) => a - b);

  return declarations.map((decl) => {
    const end = nearestBoundaryAfter(decl.index, boundaries) ?? source.length;
    const code = source.slice(decl.index, end).trimEnd();
    return { ...decl, code };
  });
}

function getSectionTitle(index, sections) {
  let active = sections[0].title;
  for (const sec of sections) {
    if (sec.index <= index) active = sec.title;
    else break;
  }
  return active;
}

function statementFor(item) {
  const title = toTitle(item.name);
  if (item.kind === 'class') {
    return `Design and implement the **${title}** class in JavaScript so that its methods behave exactly as required in the DSA sheet.`;
  }
  const sig = `${item.name}(${item.params.join(', ')})`;
  return `Implement **${sig}** to solve the **${title}** problem efficiently in JavaScript.`;
}

function renderMarkdown(items) {
  const lines = [];
  lines.push('# DSA Sheet Solutions (JavaScript)');
  lines.push('');
  lines.push(`Generated at: ${new Date().toISOString()}`);
  lines.push(`Total problems: ${items.length}`);
  lines.push('');

  let currentSection = null;

  items.forEach((item, idx) => {
    if (item.section !== currentSection) {
      currentSection = item.section;
      lines.push(`## ${currentSection}`);
      lines.push('');
    }

    const title = toTitle(item.name);
    lines.push(`### ${idx + 1}. ${title} (\`${item.name}\`)`);
    lines.push('');
    lines.push('**Problem Statement**');
    lines.push(statementFor(item));
    lines.push('');

    lines.push('**Example Cases**');
    item.examples.forEach((ex, i) => {
      lines.push(`${i + 1}. Input: \`${ex.input}\``);
      lines.push(`   Output: \`${ex.output}\``);
    });
    lines.push('');

    lines.push('**JavaScript Solution**');
    lines.push('```javascript');
    lines.push(item.code.trimEnd());
    lines.push('```');
    lines.push('');
  });

  return lines.join('\n');
}

async function run() {
  const source = await fs.readFile(INPUT_FILE, 'utf8');

  const sections = parseSections(source);
  const sectionIndices = Array.from(source.matchAll(/^\/\* =====================================/gm)).map((m) => m.index);
  const declarations = parseDeclarations(source);
  const exported = parseExportedNames(source);
  const exportIndex = source.indexOf('export {');

  const filtered = declarations.filter((d) => exported.has(d.name));
  const blocks = buildBlocks(source, filtered, sectionIndices, exportIndex);

  const items = blocks.map((item) => ({
    ...item,
    section: getSectionTitle(item.index, sections),
    examples: generateExamples(item.name, item.params, item.kind)
  }));

  const markdown = renderMarkdown(items);
  await fs.writeFile(OUTPUT_FILE, markdown + '\n', 'utf8');

  console.log('[done] Generated markdown file');
  console.log(`- Input: ${INPUT_FILE}`);
  console.log(`- Output: ${OUTPUT_FILE}`);
  console.log(`- Problems: ${items.length}`);
}

run().catch((error) => {
  console.error('[error]', error.message);
  process.exitCode = 1;
});
