import JSONWebTokenAuthenticationStrategy from "../../../../src/middleware/authentication/JSONWebTokenAuthenticationStrategy";
import { mockRequest, mockResponse } from "mock-req-res";
import { Response } from "express";
import UserModel from "../../../../src/models/User/UserModel";
import faker from "faker";
import bcrypt from "bcrypt";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWQ4YTY1YTg3Y2QzYWJjNTMxZDAzNjYiLCJpYXQiOjE1OTEyNTY3OTd9.e040OqKVaOR96Ii6r3CYKZVk1qNtCfZeHlTnU9Z0wD8"

beforeAll(() => {
    process.env.ACCESS_TOKEN_SECRET = "14892da174d0e1e291ab2a7694fd0b91be52be3778f9aae1f5d508df2eabd8b5555e287a48e97c14e376d97b9ed94a18f8d57505b8a1e51ddaa8a170c5708526"
});

describe("JSON Web token Authentication Strategy", () => {
    describe("authenticate", () => {
        test("Should fail to authenticate due to no headers",  async () => {
            const strategy = new JSONWebTokenAuthenticationStrategy();
            const request = mockRequest();
            const response = mockResponse();

            await strategy.authenticate()(request, response, () => {});

            expectUnauthorizedResponse(response, "Unauthorized request");
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

            expectUnauthorizedResponse(res, "Unauthorized request");
        });

        test("Should not authenticate request with invalid token", async () => {
            const strategy = new JSONWebTokenAuthenticationStrategy();
            const req = mockRequest({
                headers: {
                    "authorization": "Bearer invalid_token"
                }
            });
            const res = mockResponse();
            UserModel.findById = jest.fn().mockResolvedValue(null);
        
            await strategy.authenticate()(req, res, () => {});

            expectUnauthorizedResponse(res, "Unauthorized request");
        });

        test("Should not authenticate request with non existant user", async () => {
            const strategy = new JSONWebTokenAuthenticationStrategy();
            const req = mockRequest({
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            const res = mockResponse();
        
            await strategy.authenticate()(req, res, () => {});

            expectUnauthorizedResponse(res, "Unauthorized request");
        });

        test("Should authenticate request with valid token", async () => {
            const user = getUser(faker.internet.password())
            user.verified = true;
            const strategy = new JSONWebTokenAuthenticationStrategy();
            const req = mockRequest({
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            const res = mockResponse();
            UserModel.findById = jest.fn().mockResolvedValue(user);
        
            await strategy.authenticate()(req, res, () => {});

            expect(req.user.serialize()).toEqual(user.serialize())
        })
    });
})

function expectUnauthorizedResponse(res : Response, message : string) {
    expectUnauthorizedStatus(res);
    expectUnauthorizedBody(res, message);
}

function expectUnauthorizedStatus(res : Response) {
    expect(res.status).toHaveBeenCalledWith(401);
}

function expectUnauthorizedBody(res : Response, message: string) {
    expect(res.json).toHaveBeenCalledWith({
        success: false,
        data: {
            error: message
        }
    })
}

function getUser(password: string) {
    return new UserModel({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: bcrypt.hashSync(password, 1)
    })
}