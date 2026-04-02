'use strict';

const user = {
  id: 101,
  name: 'Ada Lovelace',
  contact: {
    email: 'ada@example.com',
    phone: '+1-202-555-0101',
  },
  roles: ['admin', 'editor', 'viewer'],
};

const {
  id,
  name: displayName,
  contact: { email, phone: phoneNumber },
  roles: [primaryRole, ...otherRoles],
} = user;

console.log('Id:', id);
console.log('Display name:', displayName);
console.log('Email:', email);
console.log('Phone number:', phoneNumber);
console.log('Primary role:', primaryRole);
console.log('Other roles:', otherRoles);
