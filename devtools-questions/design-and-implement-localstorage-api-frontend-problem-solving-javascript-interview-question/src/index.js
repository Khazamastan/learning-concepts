import { MemoryStorage } from './storage.js';

const storage = new MemoryStorage();

storage.setItem('theme', 'dark');
storage.setItem('visits', 7);

console.log('Stored keys:', storage.length);
console.log('theme:', storage.getItem('theme'));
console.log('visits:', storage.getItem('visits'));
console.log('key(0):', storage.key(0));

storage.removeItem('theme');
console.log('After removing theme:', storage.getItem('theme'));

storage.clear();
console.log('Length after clear:', storage.length);
