export default  {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
};