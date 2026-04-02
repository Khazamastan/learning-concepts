#!/usr/bin/env node
// Toy Git client implementing init/add/commit/log commands in Node.js.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const GIT_DIR = '.minigit';
const OBJECTS_DIR = path.join(GIT_DIR, 'objects');
const REFS_DIR = path.join(GIT_DIR, 'refs', 'heads');
const HEAD_FILE = path.join(GIT_DIR, 'HEAD');
const INDEX_FILE = path.join(GIT_DIR, 'index.json');
const DEFAULT_BRANCH = 'main';

function ensureRepoExists() {
  if (!fs.existsSync(GIT_DIR)) {
    console.error("Repository not initialized. Run 'init' first.");
    process.exit(1);
  }
}

function sha1(buffer) {
  return crypto.createHash('sha1').update(buffer).digest('hex');
}

function writeObject(buffer) {
  const hash = sha1(buffer);
  fs.writeFileSync(path.join(OBJECTS_DIR, hash), buffer);
  return hash;
}

function loadIndex() {
  if (!fs.existsSync(INDEX_FILE)) return {};
  return JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
}

function saveIndex(index) {
  fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2));
}

function currentBranch() {
  ensureRepoExists();
  const ref = fs.readFileSync(HEAD_FILE, 'utf8').trim();
  if (ref.startsWith('ref: ')) {
    return ref.split('/').pop();
  }
  return DEFAULT_BRANCH;
}

function updateHead(branch) {
  fs.writeFileSync(HEAD_FILE, `ref: refs/heads/${branch}`);
}

function refPath(branch) {
  return path.join(REFS_DIR, branch);
}

function readRef(branch) {
  const ref = refPath(branch);
  return fs.existsSync(ref) ? fs.readFileSync(ref, 'utf8').trim() : null;
}

function writeRef(branch, hash) {
  fs.writeFileSync(refPath(branch), hash);
}

function cmdInit() {
  fs.mkdirSync(GIT_DIR, { recursive: true });
  fs.mkdirSync(OBJECTS_DIR, { recursive: true });
  fs.mkdirSync(REFS_DIR, { recursive: true });
  updateHead(DEFAULT_BRANCH);
  writeRef(DEFAULT_BRANCH, '');
  saveIndex({});
  console.log('Initialized empty MiniGit repository in', path.resolve(GIT_DIR));
}

function cmdAdd(files) {
  ensureRepoExists();
  const index = loadIndex();
  files.forEach((file) => {
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      console.warn(`Skipping ${file}: not a file`);
      return;
    }
    const data = fs.readFileSync(file);
    const header = Buffer.from(`blob ${data.length}\0`, 'utf8');
    const blob = Buffer.concat([header, data]);
    const hash = writeObject(blob);
    index[path.normalize(file)] = hash;
    console.log(`Staged ${file} -> ${hash}`);
  });
  saveIndex(index);
}

function cmdCommit(message, author) {
  ensureRepoExists();
  const index = loadIndex();
  if (Object.keys(index).length === 0) {
    console.log('Nothing to commit');
    return;
  }
  const branch = currentBranch();
  const parent = readRef(branch);
  const payload = {
    tree: index,
    parent,
    message,
    timestamp: Math.floor(Date.now() / 1000),
    author,
  };
  const encoded = Buffer.from(JSON.stringify(payload, Object.keys(payload).sort()), 'utf8');
  const commitHash = writeObject(Buffer.concat([Buffer.from('commit'), encoded]));
  writeRef(branch, commitHash);
  saveIndex({});
  console.log(`[${branch}] ${commitHash.substring(0, 7)} ${message}`);
}

function cmdLog() {
  ensureRepoExists();
  let hash = readRef(currentBranch());
  if (!hash) {
    console.log('No commits yet');
    return;
  }
  while (hash) {
    const raw = fs.readFileSync(path.join(OBJECTS_DIR, hash));
    if (!raw.slice(0, 6).equals(Buffer.from('commit'))) {
      throw new Error('Corrupt object encountered');
    }
    const payload = JSON.parse(raw.slice(6).toString('utf8'));
    const timestamp = new Date(payload.timestamp * 1000).toISOString();
    console.log(`commit ${hash}\nAuthor: ${payload.author}\nDate:   ${timestamp}\n\n    ${payload.message}\n`);
    hash = payload.parent || '';
  }
}

function main() {
  const [,, command, ...args] = process.argv;
  switch (command) {
    case 'init':
      cmdInit();
      break;
    case 'add':
      if (args.length === 0) {
        console.error('Usage: node example.js add <files...>');
        process.exit(1);
      }
      cmdAdd(args);
      break;
    case 'commit': {
      const messageIndex = args.indexOf('-m');
      if (messageIndex < 0 || !args[messageIndex + 1]) {
        console.error('Usage: node example.js commit -m "message" [--author "Name"]');
        process.exit(1);
      }
      const message = args[messageIndex + 1];
      const authorIndex = args.indexOf('--author');
      const author = authorIndex >= 0 ? args[authorIndex + 1] : process.env.USER || 'MiniGit';
      cmdCommit(message, author);
      break;
    }
    case 'log':
      cmdLog();
      break;
    default:
      console.log(`Usage:
  node example.js init
  node example.js add <files...>
  node example.js commit -m "message" [--author "Name"]
  node example.js log`);
  }
}

if (require.main === module) {
  main();
}
