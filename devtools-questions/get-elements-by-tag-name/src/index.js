import { getElementsByTagName } from './domTraversal.js';

const tree = {
  tagName: 'div',
  children: [
    { tagName: 'span', children: [] },
    {
      tagName: 'section',
      children: [
        { tagName: 'span', children: [] },
        { tagName: 'p', children: [] },
      ],
    },
  ],
};

console.log(getElementsByTagName(tree, 'span').length);
