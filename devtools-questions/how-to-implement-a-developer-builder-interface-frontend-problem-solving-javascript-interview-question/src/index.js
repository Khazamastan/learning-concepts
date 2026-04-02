import { DeveloperBuilder } from './developerBuilder.js';

const builder = new DeveloperBuilder();

const frontendDev = builder
  .setName('Ava')
  .setPrimaryStack('Frontend')
  .setYearsExperience(5)
  .addSkill('React', 'TypeScript', 'CSS-in-JS')
  .setAvailability(true)
  .build();

const backendDev = builder
  .setName('Liam')
  .setPrimaryStack('Backend')
  .setYearsExperience(7)
  .addSkill('Node.js', 'PostgreSQL', 'Docker')
  .build();

console.log(frontendDev);
console.log(backendDev);
