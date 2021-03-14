module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ["<rootDir>/src/generated"],
  testRegex: "(/__tests__/.*)$",
  moduleNameMapper: {
    "^@auth/service(.*)$": ["<rootDir>/src/generated/io/protoforce/guide/auth/$1"],
    "^@auth/irt-node(.*)$": ["<rootDir>/src/generated/irt-node/$1"],
    "^@auth/irt(.*)$": ["<rootDir>/src/generated/irt/$1"],
  }
};
