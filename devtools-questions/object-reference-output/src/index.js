const name = { firstName: 'devtools', lastName: 'tech' };
const nameCopy = name;

nameCopy.firstName = 'dev';

console.log('Original object:', name);
console.log('Copy reference:', nameCopy);
