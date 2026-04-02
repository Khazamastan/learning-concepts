import { stringToObject } from './stringToObject.js';

const input = `user.name=Devtools Tech\nuser.plan=premium\nsettings.theme=dark\nsettings.notifications.email=true`;
console.log(stringToObject(input));
