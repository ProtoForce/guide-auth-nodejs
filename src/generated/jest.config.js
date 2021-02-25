const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  maxWorkers: 16,
  maxConcurrency: 16,
  globals: {
    window: {},
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  rootDir: '.',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths , { prefix: '<rootDir>/' } )
};
       