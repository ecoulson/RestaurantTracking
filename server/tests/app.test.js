const app = require("../src/app");

describe("App Suite", () => {
    test("Successfully imports the application", () => {
        expect(app).not.toBe(null);
    })
});