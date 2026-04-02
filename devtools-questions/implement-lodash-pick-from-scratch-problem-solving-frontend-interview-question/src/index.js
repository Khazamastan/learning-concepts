import { pick } from './pick.js';

const user = {
  id: 42,
  profile: {
    name: 'Kai',
    location: { city: 'Berlin', country: 'DE' },
  },
  roles: ['admin', 'editor'],
};

const picked = pick(user, ['profile.name', 'profile.location.city', 'roles']);
console.log(picked);
