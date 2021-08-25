module.exports = {
  setupFilesAfterEnv: ['jest-extended'],
  setupFiles: ['./test/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/cypress/'],
  testRegex: '\\.test\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
