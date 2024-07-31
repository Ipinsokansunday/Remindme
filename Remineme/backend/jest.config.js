module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/test/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },

  // Setup files to configure environment variables before tests run
  setupFiles: ['dotenv/config'],

  // Setup files that will run after the environment is set up and before the tests run
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  // Configure Jest to use the specified environment variable file for tests
  globals: {
    'process.env': {
      NODE_ENV: 'test',
    },
  },

  // Detect open handles to help troubleshoot any asynchronous issues
  detectOpenHandles: true,
};
