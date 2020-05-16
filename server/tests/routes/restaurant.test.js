const request = require("supertest");
const app = require("../../src/app");

describe("Restaurant Route Suite", () => {
    test("A successful registration", async () => {
        const response = await request(app).post("/restaurant/register");
        expect(response.statusCode).toBe(200);
    })
})