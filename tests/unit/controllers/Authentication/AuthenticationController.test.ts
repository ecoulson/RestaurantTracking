import AuthenticationController from "../../../../src/controllers/Authentication/AuthenticationController"
import { mockRequest, mockResponse } from "mock-req-res";

describe("Authentication Controller", () => {
    describe("handleLogin", () => {
        test("Should fail to log in because user does not exist", async () => {
            const controller = new AuthenticationController();
            const request = mockRequest({
                body: {
                    username: ""
                }
            });
            const response = mockResponse();

            await controller.handleLogin()(request, response, () => {})
        })
    })
})