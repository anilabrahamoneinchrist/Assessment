module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};