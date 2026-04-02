import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/src'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  coverageDirectory: '../coverage',
  collectCoverageFrom: ['src/**/*.ts', '!src/**/main.ts'],
};

export default config;
