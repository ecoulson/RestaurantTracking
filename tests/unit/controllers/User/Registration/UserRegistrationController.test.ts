jest.mock("@sendgrid/mail");
jest.mock("../../../../../src/services/Token/TokenService");
import { mockRequest, mockResponse } from "mock-req-res";
import UserGenerator from "../../../../mocks/Generators/UserGenerator";
import VerificationEmailService from "../../../../../src/services/User/Registration/VerificationEmailService";
import TokenGenerator from "../../../../mocks/Generators/TokenGenerator";
import VerificationEmailData from "../../../../../src/lib/Email/VerificationEmailData";
import VerificationEmailMessage from "../../../../../src/lib/Email/VerificationEmailMessage";
import UserRegistrationController from "../../../../../src/controllers/User/Registration/UserRegistrationController";

const userGenerator = new UserGenerator();
const tokenGenerator = new TokenGenerator();

describe("User Controller Suite", () => {
    describe("handleResendVerificationEmail", () => {
        test("check if user verified", async () => {
            const controller = new UserRegistrationController();
            userGenerator.setVerified();
            const user = userGenerator.generate();
            const request = mockRequest({ user });
            const response = mockResponse();

            try {
                await controller.handleResendVerificationEmail()(request, response);
            } catch (error) {
                expect(error).toEqual(new Error(`User ${user.username} is already verified`))
            }
            expect.assertions(1);
        })

        test("Check that verification email was sent", async () => {
            const controller = new UserRegistrationController();
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const request = mockRequest({ user });
            const response = mockResponse();
            VerificationEmailService.prototype.sendVerificationEmail = jest.fn().mockResolvedValue(
                new VerificationEmailData(
                    user,
                    new VerificationEmailMessage(user, token).getMessage(),
                    token
                )
            )

            await controller.handleResendVerificationEmail()(request, response);
            
            expect(VerificationEmailService.prototype.sendVerificationEmail).toHaveBeenCalledWith(user.email)
        });

        test("Should send successful response", async () => {
            const controller = new UserRegistrationController();
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const request = mockRequest({ user });
            const response = mockResponse();
            const emailData = new VerificationEmailData(
                user,
                new VerificationEmailMessage(user, token).getMessage(),
                token
            )
            VerificationEmailService.prototype.sendVerificationEmail = jest.fn().mockResolvedValue(emailData);

            await controller.handleResendVerificationEmail()(request, response);
            
            expect(response.json).toHaveBeenCalledWith({
                success: true,
                data: emailData
            })
        })
    })
})