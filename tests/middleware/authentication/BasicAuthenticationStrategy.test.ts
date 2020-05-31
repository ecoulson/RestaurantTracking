import { mockRequest, mockResponse } from "mock-req-res";
import { Response } from "express";
import BasicAuthenticationStrategy from "../../../src/middleware/authentication/BasicAuthenticationStrategy"

beforeAll(() => {
    process.env.SERVER_SECRET = "valid_token"
});

describe("BasicAuthenticationStrategy Test Suite", () => {
    describe("authenticate", () => {
        test("Should not authenticate request with no header", () => {
            const strategy = new BasicAuthenticationStrategy();
            const req = mockRequest();
            const res = mockResponse();
        
            strategy.authenticate()(req, res, () => {});

            expectForbiddenResponse(res);
        });

        test("Should not authenticate request with no token", () => {
            const strategy = new BasicAuthenticationStrategy();
            const req = mockRequest({
                headers: {
                    "authorization": "Bearer"
                }
            });
            const res = mockResponse();
        
            strategy.authenticate()(req, res, () => {});

            expectForbiddenResponse(res);
        });

        test("Should not authenticate request with invalid token", () => {
            const strategy = new BasicAuthenticationStrategy();
            const req = mockRequest({
                headers: {
                    "authorization": "Bearer invalid_token"
                }
            });
            const res = mockResponse();
        
            strategy.authenticate()(req, res, () => {});

            expectForbiddenResponse(res);
        });

        test("Should authenticate request with valid token", (done) => {
            const strategy = new BasicAuthenticationStrategy();
            const req = mockRequest({
                headers: {
                    "authorization": "Bearer valid_token"
                }
            });
            const res = mockResponse();
        
            strategy.authenticate()(req, res, () => {
                done();
            });
        })
    })
});

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