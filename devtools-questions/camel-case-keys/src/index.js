import { camelCaseKeys } from './camelCaseKeys.js';

const data = { 'user_name': 'John', 'account-status': 'active', details: { 'favorite_color': 'blue' } };
console.log(camelCaseKeys(data));
