module.exports = {
  coverageDirectory: "./coverage/",
  collectCoverage: true,
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json'
    }
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js'
  },
  testMatch: [
    '**/tests/**/*.test.(ts|js)'
  ],
  testEnvironment: 'node'
};
