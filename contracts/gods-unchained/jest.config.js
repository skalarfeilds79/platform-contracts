module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/__tests__'],
  testMatch: ['**/*.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/node_modules/', '(.*).d.ts'],
  testEnvironment: 'node',
};