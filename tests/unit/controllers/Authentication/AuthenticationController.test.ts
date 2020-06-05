import AuthenticationController from "../../../../src/controllers/Authentication/AuthenticationController"
import { mockRequest, mockResponse } from "mock-req-res";
import AuthenticationService from "../../../../src/services/Authentication/AuthenticationService";
import faker from "faker";
import UserModel from "../../../../src/models/user/UserModel";
import bcrypt from "bcrypt";

beforeEach(() => {
    jest.resetAllMocks();
})

describe("Authentication Controller", () => {
    describe("handleLogin", () => {
        test("Should fail due to an error thrown while logging in", async () => {
            AuthenticationService.prototype.login = jest.fn().mockRejectedValue(new Error());
            const controller = new AuthenticationController();
            const request = mockRequest(getLoginRequest());
            const response = mockResponse();

            try {
                await controller.handleLogin()(request, response, () => {})
            } catch (error) {
                expect(error).toEqual(new Error())
            }
        })

        test("Should fail due to an error thrown while generating token", async () => {
            AuthenticationService.prototype.generateAccessToken = jest.fn().mockRejectedValue(new Error());
            const controller = new AuthenticationController();
            const request = mockRequest(getLoginRequest());
            const response = mockResponse();

            try {
                await controller.handleLogin()(request, response, () => {})
            } catch (error) {
                expect(error).toEqual(new Error())
            }
        });

        test("Should login user and generate an access token", async () => {
            const password = faker.internet.password();
            const user = getUser(password);
            const controller = new AuthenticationController();
            const request = mockRequest(getLoginRequest());
            const response = mockResponse();
            AuthenticationService.prototype.login = jest.fn().mockResolvedValue(user);
            AuthenticationService.prototype.generateAccessToken = jest.fn().mockResolvedValue("token");

            await controller.handleLogin()(request, response, () => {});

            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({
                success: true,
                data: {
                    token: "token"
                }
            });
        })
    })
})

function getLoginRequest() {
    return {
        body: {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }
    }
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