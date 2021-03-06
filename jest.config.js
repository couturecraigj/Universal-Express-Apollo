module.exports = {
  setupFiles: ['<rootDir>tools/jest/setupTests.js'],
  globalSetup: '<rootDir>tools/jest/globalSetup.js',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/coverage/**',
    '!**/public/**',
    '!**/build/**',
    '!**/static/**',
    '!**/tools/**',
    '!**/jest.*.js',
    '!**/dev.*.js',
    '!**/dev.js',
    '!**/mocks.*.js',
    '!**/mocks.js'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tools/jest/fileTransformer.js',
    '\\.(css|less)$': '<rootDir>/tools/jest/fileTransformer.js',
    'sw-loader!./sw': '<rootDir>/tools/jest/fileTransformer.js'
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['json', 'lcov']
};
