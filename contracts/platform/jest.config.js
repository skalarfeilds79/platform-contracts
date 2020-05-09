module.exports = {
  preset: "ts-jest",
  roots: ['<rootDir>/__tests__'],
  testPathIgnorePatterns: [
    "<rootDir>/lib/",
    "<rootDir>/node_modules/",
    "(.*).d.ts"
  ],
  testRegex: '__tests__\\/.*\\.test\\.ts$',
  testEnvironment: 'node',
};
