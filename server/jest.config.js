module.exports = {
    preset: '@shelf/jest-mongodb',
    testEnvironment: 'node',
    setupFilesAfterEnv: ["jest-sinon"]
};