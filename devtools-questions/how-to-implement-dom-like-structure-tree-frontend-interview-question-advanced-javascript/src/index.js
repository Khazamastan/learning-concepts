import { VDocument } from './vdom.js';

const vDocument = new VDocument();
const body = vDocument.createElement('body');
const div = vDocument.createElement('div');

div.innerHTML = 'Hello, I am a div!';
body.appendChild(div);
vDocument.appendChild(body);

const html = vDocument.render();
console.log(html);
