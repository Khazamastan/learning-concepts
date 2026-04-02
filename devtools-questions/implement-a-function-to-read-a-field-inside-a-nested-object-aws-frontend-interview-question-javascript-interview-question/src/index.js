import { readField } from './readField.js';

const profile = {
  id: 'user-7',
  settings: {
    notifications: {
      email: true,
      sms: false,
    },
  },
};

console.log('Email notifications enabled?', readField(profile, 'settings.notifications.email', false));
console.log('Push notifications with default:', readField(profile, 'settings.notifications.push', false));
