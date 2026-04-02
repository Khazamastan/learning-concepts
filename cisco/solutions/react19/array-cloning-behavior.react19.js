// React 19 compatible example using structuredClone

const originalArray = [{ id: 1 }, { id: 2 }];

const shallowClone = [...originalArray];
shallowClone[0].id = 99;

console.log('After modifying shallow clone:');
console.log('originalArray:', originalArray);
console.log('shallowClone:', shallowClone);

const deepClone = structuredClone(originalArray);
deepClone[0].id = 123;

console.log('\nAfter modifying deep clone:');
console.log('originalArray:', originalArray);
console.log('deepClone:', deepClone);
