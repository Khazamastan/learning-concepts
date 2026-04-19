#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import readline from 'node:readline/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { problemMap } from '../modules/problem-map.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const DEFAULT_START_URL =
  'https://namastedev.com/practice?search=&sortBy=easy-medium-hard&language=js&difficulty_level=medium&status=All&companies=All&tags=All&page=1';

const HELP_TEXT = `
Usage:
  npm run namaste:scrape -- [options]

Options:
  --start-url <url>              Practice URL with query params (default: medium/js list).
  --output-dir <path>            Output directory (default: ./namastedev-output).
  --problems-file <name>         Problems JSON filename (default: problems.json).
  --solutions-file <name>        Solutions markdown filename (default: solutions.md).
  --model <name>                 OpenAI model for missing solutions (default: gpt-4.1-mini).
  --max-pages <number>           Max pages to scrape (default: all).
  --page-delay-ms <number>       Delay between page loads (default: 700).
  --timeout-ms <number>          Page timeout in ms (default: 45000).
  --headed                       Run browser in headed mode (recommended for Cloudflare/login).
  --start-from-current-page      Do not reset page=1 from the start URL.
  --no-ai                        Disable OpenAI generation fallback.
  --help                         Show this help.

Environment:
  OPENAI_API_KEY                 Optional. Used to generate missing solutions.
`;

function parseArgs(argv) {
  const options = {
    startUrl: DEFAULT_START_URL,
    outputDir: path.resolve(process.cwd(), 'namastedev-output'),
    problemsFile: 'problems.json',
    solutionsFile: 'solutions.md',
    model: 'gpt-4.1-mini',
    maxPages: Number.POSITIVE_INFINITY,
    pageDelayMs: 700,
    timeoutMs: 45_000,
    headed: false,
    startFromCurrentPage: false,
    useAI: true
  };

  for (let i = 0; i < argv.length; i += 1) {
    const raw = argv[i];
    if (!raw.startsWith('--')) continue;

    const [flag, inline] = raw.split('=');
    const value = inline ?? argv[i + 1];
    const readValue = () => {
      if (inline === undefined) i += 1;
      return value;
    };

    switch (flag) {
      case '--start-url':
        options.startUrl = readValue();
        break;
      case '--output-dir':
        options.outputDir = path.resolve(process.cwd(), readValue());
        break;
      case '--problems-file':
        options.problemsFile = readValue();
        break;
      case '--solutions-file':
        options.solutionsFile = readValue();
        break;
      case '--model':
        options.model = readValue();
        break;
      case '--max-pages':
        options.maxPages = Number(readValue());
        break;
      case '--page-delay-ms':
        options.pageDelayMs = Number(readValue());
        break;
      case '--timeout-ms':
        options.timeoutMs = Number(readValue());
        break;
      case '--headed':
        options.headed = true;
        break;
      case '--start-from-current-page':
        options.startFromCurrentPage = true;
        break;
      case '--no-ai':
        options.useAI = false;
        break;
      case '--help':
        options.help = true;
        break;
      default:
        throw new Error(`Unknown option: ${flag}`);
    }
  }

  if (!Number.isFinite(options.maxPages) || options.maxPages <= 0) {
    options.maxPages = Number.POSITIVE_INFINITY;
  }

  if (!Number.isFinite(options.pageDelayMs) || options.pageDelayMs < 0) {
    options.pageDelayMs = 700;
  }

  if (!Number.isFinite(options.timeoutMs) || options.timeoutMs <= 0) {
    options.timeoutMs = 45_000;
  }

  return options;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setUrlPage(sourceUrl, pageNumber) {
  const url = new URL(sourceUrl);
  url.searchParams.set('page', String(pageNumber));
  return url.toString();
}

function normalizeTitle(value) {
  return (value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function parseSymbols(symbolText) {
  return symbolText
    .split(/[\/,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function findMapEntry(title) {
  const normalized = normalizeTitle(title);
  const entries = Object.entries(problemMap).map(([problemTitle, [moduleFile, symbolText]]) => ({
    problemTitle,
    normalized: normalizeTitle(problemTitle),
    moduleFile,
    symbols: parseSymbols(symbolText)
  }));

  const direct = entries.find((entry) => entry.normalized === normalized);
  if (direct) return direct;

  return entries
    .filter((entry) => normalized.includes(entry.normalized) || entry.normalized.includes(normalized))
    .sort((a, b) => b.normalized.length - a.normalized.length)[0];
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractExportBlock(source, symbol) {
  const patterns = [
    new RegExp(`(?:^|\\n)export\\s+(?:async\\s+)?function\\s+${escapeRegex(symbol)}\\b`),
    new RegExp(`(?:^|\\n)export\\s+class\\s+${escapeRegex(symbol)}\\b`),
    new RegExp(`(?:^|\\n)export\\s+(?:const|let|var)\\s+${escapeRegex(symbol)}\\b`)
  ];

  for (const pattern of patterns) {
    const match = pattern.exec(source);
    if (!match) continue;

    const start = match.index === 0 ? 0 : match.index + 1;
    const remaining = source.slice(start + 1);
    const nextExportOffset = remaining.search(/\nexport\s+/);
    const end = nextExportOffset === -1 ? source.length : start + 1 + nextExportOffset;
    return source.slice(start, end).trim();
  }

  return null;
}

function looksLikeChallenge(title, bodyText) {
  const titleText = String(title || '').toLowerCase();
  const body = String(bodyText || '').toLowerCase();
  return (
    /just a moment/.test(titleText) ||
    /enable javascript and cookies to continue/.test(body) ||
    /performing security verification/.test(body) ||
    /security service to protect against malicious bots/.test(body) ||
    /ray id:/.test(body)
  );
}

async function getChallengeState(page) {
  return page.evaluate(() => {
    const bodyText = (document.body?.innerText || '').replace(/\s+/g, ' ').trim();
    const title = document.title || '';
    const titleText = title.toLowerCase();
    const body = bodyText.toLowerCase();
    const active =
      /just a moment/.test(titleText) ||
      /enable javascript and cookies to continue/.test(body) ||
      /performing security verification/.test(body) ||
      /security service to protect against malicious bots/.test(body) ||
      /ray id:/.test(body);
    return { active, title, bodyText };
  });
}

async function maybeHandleChallenge(page, headed) {
  let challenge = await getChallengeState(page);
  if (!challenge.active) return;

  if (headed) {
    console.log('[auth] Security verification detected. Waiting for auto-clear...');
    const deadline = Date.now() + 35_000;
    while (Date.now() < deadline) {
      await page.waitForTimeout(2_000);
      await page.waitForLoadState('networkidle', { timeout: 5_000 }).catch(() => {});
      challenge = await getChallengeState(page);
      if (!challenge.active) return;
    }
  }

  if (!headed) {
    throw new Error(
      'Cloudflare challenge detected. Re-run with --headed, complete the challenge manually, then continue.'
    );
  }

  if (!process.stdin.isTTY) {
    throw new Error(
      'Security verification still active and no interactive TTY is available. Re-run in a local terminal with --headed.'
    );
  }

  console.log('[auth] Cloudflare/login challenge detected. Complete it in the opened browser, then press Enter.');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  await rl.question('Press Enter after challenge is solved... ');
  rl.close();

  await page.waitForLoadState('domcontentloaded', { timeout: 120_000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 120_000 }).catch(() => {});
  challenge = await getChallengeState(page);
  if (challenge.active) {
    throw new Error('Security verification is still active after manual confirmation.');
  }
}

async function scrapeProblems(options) {
  const userDataDir = path.join(options.outputDir, '.browser-profile');
  await fs.mkdir(userDataDir, { recursive: true });

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: !options.headed,
    viewport: { width: 1440, height: 900 }
  });

  try {
    const page = context.pages()[0] || (await context.newPage());
    page.setDefaultTimeout(options.timeoutMs);

    const baseStartUrl = options.startFromCurrentPage
      ? options.startUrl
      : setUrlPage(options.startUrl, 1);
    const startPage = Number(new URL(baseStartUrl).searchParams.get('page') || '1');

    const allProblems = [];
    const seenProblemKeys = new Set();
    const seenPageSignatures = new Set();

    let pageNumber = startPage;
    let visitedPages = 0;

    while (visitedPages < options.maxPages) {
      const targetUrl = setUrlPage(baseStartUrl, pageNumber);
      console.log(`[scrape] page=${pageNumber} -> ${targetUrl}`);

      await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle', { timeout: options.timeoutMs }).catch(() => {});
      await maybeHandleChallenge(page, options.headed);

      const snapshot = await page.evaluate(() => {
        const clean = (text) => (text || '').replace(/\s+/g, ' ').trim();
        const linesOf = (text) =>
          (text || '')
            .split(/\n+/)
            .map((line) => line.trim())
            .filter(Boolean);

        const looksLikeChallenge = (title, bodyText) => {
          const titleText = (title || '').toLowerCase();
          const body = (bodyText || '').toLowerCase();
          return (
            /just a moment/.test(titleText) ||
            /enable javascript and cookies to continue/.test(body) ||
            /performing security verification/.test(body) ||
            /security service to protect against malicious bots/.test(body) ||
            /ray id:/.test(body)
          );
        };

        const pageTitle = document.title || '';
        const pageText = clean(document.body?.innerText || '');
        const hasChallenge = looksLikeChallenge(pageTitle, pageText);

        const tables = Array.from(document.querySelectorAll('table'));
        const ranked = tables
          .map((table) => ({ table, rowCount: table.querySelectorAll('tbody tr').length }))
          .sort((a, b) => b.rowCount - a.rowCount);

        const targetTable = ranked[0]?.table || null;
        let tableRows = [];
        let tableHeaders = [];

        if (targetTable) {
          tableHeaders = Array.from(targetTable.querySelectorAll('thead th')).map((th, index) => {
            const value = clean(th.textContent);
            return value || `column_${index + 1}`;
          });

          tableRows = Array.from(targetTable.querySelectorAll('tbody tr')).map((tr, rowIndex) => {
            const cells = Array.from(tr.querySelectorAll('td')).map((td) => clean(td.textContent));
            const links = Array.from(tr.querySelectorAll('a[href]'))
              .map((a) => {
                const rawHref = a.getAttribute('href');
                if (!rawHref || rawHref === '#') return null;
                return {
                  text: clean(a.textContent),
                  href: new URL(rawHref, location.origin).toString()
                };
              })
              .filter(Boolean)
              .filter((item) => item.text.length > 0);

            links.sort((a, b) => b.text.length - a.text.length);
            const bestLink = links[0] || null;
            const title = bestLink?.text || cells.find(Boolean) || `row_${rowIndex + 1}`;

            const columns = {};
            const maxLength = Math.max(tableHeaders.length, cells.length);
            for (let i = 0; i < maxLength; i += 1) {
              const key = tableHeaders[i] || `column_${i + 1}`;
              columns[key] = cells[i] || '';
            }

            return {
              title,
              url: bestLink?.href || null,
              rowIndex: rowIndex + 1,
              cells,
              columns
            };
          });
        }

        const blockedRoutes = new Set(['/practice', '/practice/bookmarks', '/practice/submissions', '/practice/liked']);
        const languagePattern = /^(javascript|react|reactjs|node\.?js|typescript|html\/css)$/i;
        const difficultyPattern = /^(easy|medium|hard)$/i;

        const problemCards = [];
        const seenCardUrls = new Set();

        for (const anchor of Array.from(document.querySelectorAll('a[href^="/practice/"]'))) {
          const rawHref = anchor.getAttribute('href') || '';
          if (!rawHref || rawHref.includes('?') || blockedRoutes.has(rawHref)) continue;

          const href = new URL(rawHref, location.origin).toString();
          if (seenCardUrls.has(href)) continue;

          const lines = linesOf(anchor.innerText || anchor.textContent || '');
          if (!lines.length) continue;

          const title = lines[0];
          if (!title || title.length < 3) continue;

          const language = lines.find((line) => languagePattern.test(line)) || null;
          const difficulty = lines.find((line) => difficultyPattern.test(line)) || null;
          const descriptionCandidate = lines[1] || '';
          const description =
            descriptionCandidate &&
            !languagePattern.test(descriptionCandidate) &&
            !difficultyPattern.test(descriptionCandidate)
              ? descriptionCandidate
              : '';

          const companies = lines.filter(
            (line, index) =>
              index > 0 &&
              line !== description &&
              line !== language &&
              line !== difficulty &&
              !/^\d+\s*(mins?|minutes?)$/i.test(line)
          );

          problemCards.push({
            title,
            url: href,
            rowIndex: problemCards.length + 1,
            cells: lines,
            columns: {
              Title: title,
              Description: description,
              Language: language || '',
              Difficulty: difficulty || '',
              Companies: companies.join(', ')
            }
          });

          seenCardUrls.add(href);
        }

        const headers =
          tableRows.length > 0
            ? tableHeaders
            : ['Title', 'Description', 'Language', 'Difficulty', 'Companies'];
        const rows = tableRows.length > 0 ? tableRows : problemCards;
        const mode = tableRows.length > 0 ? 'table' : 'cards';

        return {
          hasChallenge,
          mode,
          headers,
          rows
        };
      });

      if (snapshot.hasChallenge) {
        throw new Error('Cloudflare challenge is still active after manual confirmation.');
      }

      if (!snapshot.rows.length) {
        console.log(`[scrape] no rows detected on page ${pageNumber}, stopping.`);
        break;
      }

      const signature = snapshot.rows.map((row) => normalizeTitle(row.title)).join('|');
      if (seenPageSignatures.has(signature)) {
        console.log(`[scrape] duplicate page detected at page ${pageNumber}, stopping.`);
        break;
      }
      seenPageSignatures.add(signature);

      let newOnPage = 0;
      for (const row of snapshot.rows) {
        const key = row.url || normalizeTitle(row.title);
        if (seenProblemKeys.has(key)) continue;

        seenProblemKeys.add(key);
        newOnPage += 1;

        const normalizedColumns = Object.fromEntries(
          Object.entries(row.columns).map(([column, value]) => [column.trim(), value.trim()])
        );

        const derived = deriveProblemMetadata(normalizedColumns, row.cells);

        allProblems.push({
          title: row.title,
          url: row.url,
          page: pageNumber,
          rowIndex: row.rowIndex,
          columns: normalizedColumns,
          ...derived
        });
      }

      console.log(
        `[scrape] captured ${newOnPage} new problems on page ${pageNumber} (total=${allProblems.length})`
      );

      if (newOnPage === 0) {
        console.log('[scrape] no new problems were found on this page, stopping.');
        break;
      }

      visitedPages += 1;
      pageNumber += 1;
      if (options.pageDelayMs > 0) {
        await sleep(options.pageDelayMs);
      }
    }

    return allProblems;
  } finally {
    await context.close();
  }
}

function deriveProblemMetadata(columns, cells) {
  const columnEntries = Object.entries(columns);
  const asText = [...columnEntries.map(([k, v]) => `${k}:${v}`), ...cells].join(' | ').toLowerCase();

  const findByHeader = (patterns) => {
    for (const [key, value] of columnEntries) {
      if (patterns.some((pattern) => pattern.test(key.toLowerCase()))) {
        return value || null;
      }
    }
    return null;
  };

  const findDifficulty = () => {
    const direct = findByHeader([/difficulty/]);
    if (direct) return direct;
    const match = asText.match(/\b(easy|medium|hard)\b/);
    return match ? match[1] : null;
  };

  const findStatus = () => {
    const direct = findByHeader([/status/]);
    if (direct) return direct;
    const match = asText.match(/\b(solved|unsolved|attempted|todo|done)\b/);
    return match ? match[1] : null;
  };

  const findDescription = () => {
    const direct = findByHeader([/description/, /^problem$/, /statement/, /question/]);
    if (direct) return direct;
    const titleValue = findByHeader([/^title$/]) || null;
    const longCell = cells.find((cell) => cell && cell.length > 25 && cell !== titleValue);
    return longCell || null;
  };

  const findTags = () => {
    const direct = findByHeader([/tag/]);
    if (direct) {
      return direct
        .split(/[,/|]/)
        .map((tag) => tag.trim())
        .filter(Boolean);
    }
    return [];
  };

  const findCompanies = () => {
    const direct = findByHeader([/company/]);
    if (direct) {
      return direct
        .split(/[,/|]/)
        .map((tag) => tag.trim())
        .filter(Boolean);
    }
    return [];
  };

  return {
    description: findDescription(),
    difficulty: findDifficulty(),
    status: findStatus(),
    tags: findTags(),
    companies: findCompanies()
  };
}

function isReactProblem(problem) {
  const blob = `${problem.title} ${(problem.tags || []).join(' ')}`.toLowerCase();
  return /\breact|jsx|component|hook|frontend\b/.test(blob);
}

async function loadModuleSource(moduleFile, cache) {
  if (cache.has(moduleFile)) return cache.get(moduleFile);
  const absPath = path.join(repoRoot, 'modules', moduleFile);
  const source = await fs.readFile(absPath, 'utf8');
  cache.set(moduleFile, source);
  return source;
}

async function generateLocalSolution(problem, moduleCache) {
  const entry = findMapEntry(problem.title);
  if (!entry) return null;

  const source = await loadModuleSource(entry.moduleFile, moduleCache);
  const blocks = [];

  for (const symbol of entry.symbols) {
    const trimmed = symbol.trim();
    if (!trimmed) continue;

    const snippet = extractExportBlock(source, trimmed);
    if (snippet) blocks.push(snippet);
  }

  if (!blocks.length) return null;

  return {
    sourceType: 'local-module',
    body: [
      `Using local implementation from \`modules/${entry.moduleFile}\` (\`${entry.symbols.join(', ')}\`).`,
      '',
      '```javascript',
      blocks.join('\n\n'),
      '```'
    ].join('\n')
  };
}

async function generateAISolution(problem, model) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const prompt = [
    `Problem Title: ${problem.title}`,
    `Difficulty: ${problem.difficulty || 'unknown'}`,
    `Problem URL: ${problem.url || 'n/a'}`,
    `Tags: ${(problem.tags || []).join(', ') || 'n/a'}`,
    '',
    'Generate one practical solution in JavaScript or React.',
    'Rules:',
    '- If this is a React/UI problem, return a React solution.',
    '- Otherwise return a plain JavaScript solution.',
    '- Keep explanation brief (max 6 bullet points).',
    '- Include one executable code block.',
    '- Mention time/space complexity where applicable.'
  ].join('\n');

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text: 'You are a senior interviewer-grade JavaScript + React problem solver.'
            }
          ]
        },
        {
          role: 'user',
          content: [{ type: 'input_text', text: prompt }]
        }
      ]
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenAI API request failed (${response.status}): ${errorBody}`);
  }

  const payload = await response.json();
  const outputText = payload.output_text?.trim();
  if (!outputText) return null;

  return {
    sourceType: 'ai-generated',
    body: outputText
  };
}

function generateTemplateSolution(problem) {
  if (isReactProblem(problem)) {
    return {
      sourceType: 'template',
      body: [
        'Fallback template (no local or AI match found):',
        '',
        '```jsx',
        `import { useState } from 'react';`,
        '',
        `export default function ${toSafeIdentifier(problem.title, 'SolutionComponent')}() {`,
        '  const [state, setState] = useState(null);',
        '',
        '  // TODO: implement problem-specific state/handlers.',
        '  return (',
        '    <div>',
        `      <h3>${escapeTemplateText(problem.title)}</h3>`,
        '      <pre>{JSON.stringify(state, null, 2)}</pre>',
        '      <button onClick={() => setState((prev) => prev)}>Run</button>',
        '    </div>',
        '  );',
        '}',
        '```'
      ].join('\n')
    };
  }

  return {
    sourceType: 'template',
    body: [
      'Fallback template (no local or AI match found):',
      '',
      '```javascript',
      `function ${toSafeIdentifier(problem.title, 'solveProblem')}(input) {`,
      '  // TODO: implement the algorithm for this specific problem.',
      '  return input;',
      '}',
      '',
      '// Example:',
      '// console.log(solveProblem(...));',
      '```'
    ].join('\n')
  };
}

function toSafeIdentifier(title, fallback) {
  const cleaned = (title || '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((part, index) => {
      if (index === 0) return part.toLowerCase();
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join('');

  const valid = cleaned.replace(/^[^a-zA-Z_$]+/, '');
  return valid || fallback;
}

function escapeTemplateText(value) {
  return String(value || '').replace(/[<>]/g, '');
}

function toMarkdown(problems, solutionEntries, stats) {
  const lines = [];
  lines.push('# NamasteDev Practice Solutions');
  lines.push('');
  lines.push(`Generated at: ${new Date().toISOString()}`);
  lines.push(`Total problems: ${problems.length}`);
  lines.push(
    `Sources: local=${stats.localModule}, ai=${stats.aiGenerated}, template=${stats.template}`
  );
  lines.push('');

  for (let i = 0; i < problems.length; i += 1) {
    const problem = problems[i];
    const solution = solutionEntries[i];

    lines.push(`## ${i + 1}. ${problem.title}`);
    lines.push(`- Source: ${solution.sourceType}`);
    lines.push(`- Difficulty: ${problem.difficulty || 'unknown'}`);
    lines.push(`- Status: ${problem.status || 'unknown'}`);
    lines.push(`- Page: ${problem.page}`);
    if (problem.url) lines.push(`- Problem URL: ${problem.url}`);
    if (problem.tags?.length) lines.push(`- Tags: ${problem.tags.join(', ')}`);
    if (problem.companies?.length) lines.push(`- Companies: ${problem.companies.join(', ')}`);
    lines.push('');
    lines.push(solution.body);
    lines.push('');
  }

  return lines.join('\n');
}

async function generateSolutions(problems, options) {
  const moduleCache = new Map();
  const entries = [];
  const stats = {
    localModule: 0,
    aiGenerated: 0,
    template: 0
  };

  for (let i = 0; i < problems.length; i += 1) {
    const problem = problems[i];
    console.log(`[solve] ${i + 1}/${problems.length}: ${problem.title}`);

    let solution = await generateLocalSolution(problem, moduleCache);
    if (solution) {
      stats.localModule += 1;
      entries.push(solution);
      continue;
    }

    if (options.useAI && process.env.OPENAI_API_KEY) {
      try {
        solution = await generateAISolution(problem, options.model);
      } catch (error) {
        console.warn(`[solve] AI generation failed for "${problem.title}": ${error.message}`);
      }
      if (solution) {
        stats.aiGenerated += 1;
        entries.push(solution);
        continue;
      }
    }

    solution = generateTemplateSolution(problem);
    stats.template += 1;
    entries.push(solution);
  }

  return { entries, stats };
}

async function writeOutputs(problems, markdown, options, stats) {
  await fs.mkdir(options.outputDir, { recursive: true });

  const problemsPath = path.join(options.outputDir, options.problemsFile);
  const solutionsPath = path.join(options.outputDir, options.solutionsFile);

  const payload = {
    generatedAt: new Date().toISOString(),
    totalProblems: problems.length,
    sourceStats: stats,
    problems
  };

  await fs.writeFile(problemsPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  await fs.writeFile(solutionsPath, `${markdown}\n`, 'utf8');

  return { problemsPath, solutionsPath };
}

async function run() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(HELP_TEXT);
    return;
  }

  console.log('[start] scraping NamasteDev practice table...');
  const problems = await scrapeProblems(options);
  if (!problems.length) {
    throw new Error(
      'No problems were captured. If Cloudflare/login is active, rerun with --headed and solve it manually.'
    );
  }

  console.log(`[start] generating solutions for ${problems.length} problems...`);
  const { entries, stats } = await generateSolutions(problems, options);
  const markdown = toMarkdown(problems, entries, stats);
  const files = await writeOutputs(problems, markdown, options, stats);

  console.log('');
  console.log('[done] Completed successfully.');
  console.log(`- Problems: ${files.problemsPath}`);
  console.log(`- Solutions: ${files.solutionsPath}`);
  console.log(
    `- Stats: local=${stats.localModule}, ai=${stats.aiGenerated}, template=${stats.template}`
  );
}

run().catch((error) => {
  console.error(`[error] ${error.message}`);
  process.exitCode = 1;
});
