import { setByPath } from './setByPath.js';

const state = {};
setByPath(state, 'user.profile.name', 'Yomesh');
console.log(state);
