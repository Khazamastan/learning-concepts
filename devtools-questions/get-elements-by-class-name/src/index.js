import { getElementsByClassName } from './domTraversal.js';

const root = {
  tagName: 'div',
  className: 'container',
  children: [
    { tagName: 'p', className: 'text highlight', children: [] },
    { tagName: 'span', className: 'highlight', children: [] },
  ],
};

console.log(getElementsByClassName(root, 'highlight').length);
