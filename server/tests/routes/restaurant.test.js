const request = require("supertest");
const app = require("../../src/app");

describe("Restaurant Routes Suite", () => {
    describe("Registration Route", () => {
        test("A registration request with empty body", async () => {
            const response = await request(app).post("/restaurant/register");

            expect(response.status).toBe(400);
            expect(response.header["content-type"]).toBe("application/json; charset=utf-8");
            expect(response.body).toEqual({
                success: false,
                message: "Failed to register account"
            });
        })

        test("A successful registration", async () => {
            const response = await request(app).post("/restaurant/register").send({
                number: "4255035202",
                name: "Bob's Burgers"
            })

            expect(response.status).toBe(200);
            expect(response.header["content-type"]).toBe("application/json; charset=utf-8");
            expect(response.body).toEqual({
                success: true,
                message: "Successfully registered Bob's Burgers"
            });
        })
    });
})