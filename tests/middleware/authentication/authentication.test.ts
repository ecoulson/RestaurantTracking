import { authenticate } from "../../../src/middleware/authentication";
import { mockRequest, mockResponse } from "mock-req-res";
import { match } from "sinon";
import { Response } from "express";

beforeAll(() => {
    process.env.SERVER_SECRET = "valid_token"
});

describe("Authentication Test Suite", () => {
    describe("authenticate", () => {
        test("Should not authenticate request with no header", () => {
            const req = mockRequest();
            const res = mockResponse();
        
            authenticate(req, res, () => {});

            expectForbiddenResponse(res);
        });

        test("Should not authenticate request with no token", () => {
            const req = mockRequest({
                headers: {
                    "authorization": "Bearer"
                }
            });
            const res = mockResponse();
        
            authenticate(req, res, () => {});

            expectForbiddenResponse(res);
        });

        test("Should not authenticate request with invalid token", () => {
            const req = mockRequest({
                headers: {
                    "authorization": "Bearer invalid_token"
                }
            });
            const res = mockResponse();
        
            authenticate(req, res, () => {});

            expectForbiddenResponse(res);
        });

        test("Should authenticate request with valid token", (done) => {
            const req = mockRequest({
                headers: {
                    "authorization": "Bearer valid_token"
                }
            });
            const res = mockResponse();
        
            authenticate(req, res, () => {
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
    expect(res.json).toHaveBeenCalledWith(match({
        success: false,
        data: {
            error: "Access forbidden"
        }
    }))
}