import { createDomNode, renderToString } from './domRenderer.js';

const tree = {
  type: 'section',
  props: { id: 'profile-card', class: 'card' },
  children: [
    {
      type: 'h2',
      props: { class: 'card__title' },
      children: ['Grace Hopper'],
    },
    {
      type: 'p',
      props: { class: 'card__subtitle' },
      children: ['Pioneer of computer programming'],
    },
    {
      type: 'button',
      props: {
        class: 'card__cta',
        type: 'button',
        onClick: () => console.log('Button clicked'),
      },
      children: ['Follow'],
    },
  ],
};

console.log('Rendered HTML string:');
console.log(renderToString(tree));

if (typeof document !== 'undefined') {
  // When executed in a browser, mount the node onto the page.
  const container = document.getElementById('app');
  if (container) {
    container.appendChild(createDomNode(tree));
  }
}
