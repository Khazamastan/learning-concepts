import { deepFilter } from './deepFilter.js';

const data = [
  1,
  { type: 'folder', items: [{ type: 'file', name: 'a.txt' }, { type: 'file', name: 'b.jpg' }] },
  { type: 'file', name: 'readme.md' },
];

const onlyFiles = deepFilter(data, (item) => item && item.type === 'file');
console.log(JSON.stringify(onlyFiles, null, 2));
