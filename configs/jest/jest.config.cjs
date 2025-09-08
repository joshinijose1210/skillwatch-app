module.exports = {
    clearMocks: true,
    testEnvironment: 'jsdom',
    testMatch: ['**/*.(spec|test).(ts|tsx)'],
    rootDir: '../../',
    setupFiles: ['./configs/jest/setupEnvVars.js'],
    setupFilesAfterEnv: ['./configs/jest/setupTests.js', 'jest-canvas-mock'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleNameMapper: {
        '\\.svg$': require.resolve('./mocks/svg.js'),
        '\\.(css|less|xsl|png)$': require.resolve('./mocks/styleMock.js'),
        '^@services(.*)$': '<rootDir>/src/services$1',
        '^@slice(.*)$': '<rootDir>/src/slice$1',
        '^@constants(.*)$': '<rootDir>/src/constants$1',
        '^@testData(.*)$': '<rootDir>/testData$1',
        '^@utils(.*)$': '<rootDir>/src/utils$1',
        '^@pages(.*)$': '<rootDir>/src/pages$1',
        '^@components(.*)$': '<rootDir>/src/components$1',
        '^@common(.*)$': '<rootDir>/src/common$1',
        '^@mocks(.*)$': '<rootDir>/src/mocks$1',
        '^@theme(.*)$': '<rootDir>/src/theme$1'
    },
    coveragePathIgnorePatterns: [
        '<rootDir>/configs/*',
        '<rootDir>/src/common/*',
        '<rootDir>/src/components/*',
        '<rootDir>/src/constants/*',
        '<rootDir>/src/utils/',
        '<rootDir>/src/routes/',
        '<rootDir>/src/slice/',
        '<rootDir>/src/theme/'
    ],
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 85,
            functions: 85,
            lines: 85,
            statements: 85
        }
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    },
    transformIgnorePatterns: []
};
