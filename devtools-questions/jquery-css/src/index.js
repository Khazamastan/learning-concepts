import { css } from './jqueryCss.js';

const element = { style: {} };
css(element, 'backgroundColor', 'tomato');
console.log(css(element, 'backgroundColor'));
