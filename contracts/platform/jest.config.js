module.exports = {
  preset: "ts-jest",
  roots: ['<rootDir>/__tests__'],
  testPathIgnorePatterns: [
    "<rootDir>/lib/",
    "<rootDir>/node_modules/",
    "(.*).d.ts"
  ],
  testRegex: '__tests__\\/.*\\.test\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node', 'd.ts'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'node',
};
