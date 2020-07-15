jest.mock("@sendgrid/mail");
jest.mock("../../../../../src/services/Token/TokenService");
import { mockRequest, mockResponse } from "mock-req-res";
import UserGenerator from "../../../../mocks/Generators/UserGenerator";
import VerificationEmailService from "../../../../../src/services/User/Registration/VerificationEmailService";
import UserRegistrationController from "../../../../../src/controllers/User/Registration/UserRegistrationController";
import EmailData from "../../../../../src/lib/Email/EmailData";
import EmailMessageBuilder from "../../../../../src/lib/Email/EmailMessageBuilder";
import Email from "../../../../../src/lib/Email/Email";
import VerifyUserService from "../../../../../src/services/User/Registration/VerifyUserService";

const userGenerator = new UserGenerator();

Email.prototype.send = jest.fn();

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
            const request = mockRequest({ user });
            const response = mockResponse();
            VerifyUserService.prototype.verify = jest.fn().mockResolvedValue(user);
            VerificationEmailService.prototype.sendVerificationEmail = jest.fn().mockResolvedValue(
                new EmailData(new EmailMessageBuilder().build().getMessage())
            )

            await controller.handleResendVerificationEmail()(request, response);
            
            expect(VerifyUserService.prototype.verify).toHaveBeenCalledWith(user.email, new Map())
        });

        test("Should send successful response", async () => {
            const controller = new UserRegistrationController();
            const user = userGenerator.generate();
            const request = mockRequest({ user });
            const response = mockResponse();
            const emailData = new EmailData(new EmailMessageBuilder().build().getMessage());
            VerifyUserService.prototype.verify = jest.fn().mockResolvedValue(user);
            VerificationEmailService.prototype.sendVerificationEmail = jest.fn().mockResolvedValue(
                emailData
            );

            await controller.handleResendVerificationEmail()(request, response);
            
            expect(response.json).toHaveBeenCalledWith({
                success: true,
                data: user
            })
        })
    })
})