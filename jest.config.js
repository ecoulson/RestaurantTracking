module.exports = {
    preset: '@shelf/jest-mongodb',
    testEnvironment: 'node',
    setupFilesAfterEnv: ["jest-sinon"],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    coverageReporters: ['json', 'lcov', 'text', 'clover']
};