jest.mock("@sendgrid/mail");
jest.mock("../../../../../src/services/Token/TokenService");
import { mockRequest, mockResponse } from "mock-req-res";
import UserGenerator from "../../../../mocks/Generators/UserGenerator";
import EmailService from "../../../../../src/services/Email/EmailService";
import UserRegistrationController from "../../../../../src/controllers/User/Registration/UserRegistrationController";
import EmailData from "../../../../../src/services/Email/EmailData";
import EmailMessageBuilder from "../../../../../src/services/Email/EmailMessageBuilder";
import Email from "../../../../../src/services/Email/Email";
import VerifyUserService from "../../../../../src/services/User/Registration/VerifyUserService";
import UserRegistrationService from "../../../../../src/services/User/Registration/UserRegistrationService";
import TokenService from "../../../../../src/services/Token/TokenService";
import Scope from "../../../../../src/services/Token/Scope";
import TokenBroker from "../../../../../src/brokers/TokenBroker";
import UserBroker from "../../../../../src/brokers/UserBroker";
import EmailBroker from "../../../../../src/brokers/EmailBroker";
import UserPermissionSetupService from "../../../../../src/services/User/Registration/UserPermissionSetupService";
import PermissionSetService from "../../../../../src/services/Permission/PermissionSetService";
import PermissionSetBroker from "../../../../../src/brokers/PermissionSetBroker";
import UsernameAvailabilityService from "../../../../../src/services/User/Registration/UsernameAvailibilityService";

const userGenerator = new UserGenerator();

Email.prototype.send = jest.fn();

describe("User Controller Suite", () => {
    describe("handleResendVerificationEmail", () => {
        test("check if user verified", async () => {
            const controller = new UserRegistrationController(
                new UserRegistrationService(),
                new TokenService([Scope.VerifyEmail], 24, new TokenBroker()),
                new UserBroker(),
                new EmailService(new EmailBroker()),
                new UserPermissionSetupService(
                    new PermissionSetService(
                        new PermissionSetBroker()
                    )
                ),
                new VerifyUserService(),
                new UsernameAvailabilityService()
            );
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
            const controller = new UserRegistrationController(
                new UserRegistrationService(),
                new TokenService([Scope.VerifyEmail], 24, new TokenBroker()),
                new UserBroker(),
                new EmailService(new EmailBroker()),
                new UserPermissionSetupService(
                    new PermissionSetService(
                        new PermissionSetBroker()
                    )
                ),
                new VerifyUserService(),
                new UsernameAvailabilityService()
            );
            const user = userGenerator.generate();
            const request = mockRequest({ user });
            const response = mockResponse();
            VerifyUserService.prototype.verify = jest.fn().mockResolvedValue(user);
            EmailService.prototype.sendEmail = jest.fn().mockResolvedValue(
                new EmailData(new EmailMessageBuilder().build().getMessage())
            )

            await controller.handleResendVerificationEmail()(request, response);
            
            expect(VerifyUserService.prototype.verify).toHaveBeenCalled()
        });

        test("Should send successful response", async () => {
            const controller = new UserRegistrationController(
                new UserRegistrationService(),
                new TokenService([Scope.VerifyEmail], 24, new TokenBroker()),
                new UserBroker(),
                new EmailService(new EmailBroker()),
                new UserPermissionSetupService(
                    new PermissionSetService(
                        new PermissionSetBroker()
                    )
                ),
                new VerifyUserService(),
                new UsernameAvailabilityService()
            );
            const user = userGenerator.generate();
            const request = mockRequest({ user });
            const response = mockResponse();
            const emailData = new EmailData(new EmailMessageBuilder().build().getMessage());
            VerifyUserService.prototype.verify = jest.fn().mockResolvedValue(user);
            EmailService.prototype.sendEmail = jest.fn().mockResolvedValue(
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