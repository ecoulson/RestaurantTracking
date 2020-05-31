import JSONWebTokenAuthenticationStrategy from "../../../src/middleware/authentication/JSONWebTokenAuthenticationStrategy";
import { mockRequest, mockResponse } from "mock-req-res";
import { Response } from "express";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.gu0v9eGf5dtftgoM4-lPXZRUt3QHTJl2jbNPHaYQS1I"

beforeAll(() => {
    process.env.ACCESS_TOKEN_SECRET = "valid"
});

describe("JSON Web token Authentication Strategy", () => {
    describe("authenticate", () => {
        test("Should fail to authenticate due to no headers",  async () => {
            const strategy = new JSONWebTokenAuthenticationStrategy();
            const request = mockRequest();
            const response = mockResponse();

            await strategy.authenticate()(request, response, () => {});

            expectForbiddenResponse(response);
        });

        test("Should not authenticate request with no token", async () => {
            const strategy = new JSONWebTokenAuthenticationStrategy();
            const req = mockRequest({
                headers: {
                    "authorization": "Bearer"
                }
            });
            const res = mockResponse();
        
            await strategy.authenticate()(req, res, () => {});

            expectForbiddenResponse(res);
        });

        test("Should not authenticate request with invalid token", async () => {
            const strategy = new JSONWebTokenAuthenticationStrategy();
            const req = mockRequest({
                headers: {
                    "authorization": "Bearer invalid_token"
                }
            });
            const res = mockResponse();
        
            await strategy.authenticate()(req, res, () => {});

            expectForbiddenResponse(res);
        });

        test("Should authenticate request with valid token", (done) => {
            const strategy = new JSONWebTokenAuthenticationStrategy();
            const req = mockRequest({
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            const res = mockResponse();
        
            strategy.authenticate()(req, res, () => {
                expect((req as any).user).toEqual({
                    sub: '1234567890',
                    name: 'John Doe',
                    iat: 1516239022 
                })
                done();
            });
        })
    });
})

function expectForbiddenResponse(res : Response) {
    expectForbiddenStatus(res);
    expectForbiddenBody(res);
}

function expectForbiddenStatus(res : Response) {
    expect(res.status).toHaveBeenCalledWith(403);
}

function expectForbiddenBody(res : Response) {
    expect(res.json).toHaveBeenCalledWith({
        success: false,
        data: {
            error: "Access forbidden"
        }
    })
}