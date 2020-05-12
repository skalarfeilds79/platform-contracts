module.exports = {
  preset: "ts-jest",
  roots: ['<rootDir>/__tests__'],
  testPathIgnorePatterns: [
    "<rootDir>/lib/",
    "<rootDir>/node_modules/",
    "(.*).d.ts"
  ],
  testEnvironment: 'node',
};
