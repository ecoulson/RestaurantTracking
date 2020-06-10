jest.mock( "@sendgrid/mail");
import UserModel from "../../../../src/models/user/UserModel";
import VerificationEmailService from "../../../../src/services/User/VerificationEmailService";
import TokenService from "../../../../src/services/Token/TokenService";
import SendGridMail from "@sendgrid/mail";
import UserGenerator from "../../../mocks/Generators/UserGenerator";
import TokenGenerator from "../../../mocks/Generators/TokenGenerator";
import VerificationEmailData from "../../../../src/lib/Email/VerificationEmailData";
import VerificationEmailMessage from "../../../../src/lib/Email/VerificationEmailMessage";

beforeAll(() => {
    process.env.HOST_NAME = "localhost"
    process.env.PORT = "8080"
});

const userGenerator = new UserGenerator();
const tokenGenerator = new TokenGenerator();

describe("Verification Email Service Suite", () => {
    describe("Send verification email", () => {
        test("Fails to find a user with the given email", async () => {
            const user = userGenerator.generate()
            const service = new VerificationEmailService();
            UserModel.findByEmail = jest.fn().mockRejectedValue(new Error());

            try {
                await service.sendVerificationEmail(user.email);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to find user with email ${user.email}`)
                );
            }
            expect.assertions(1);
        });

        test("No user with the given email", async () => {
            const user = userGenerator.generate()
            const service = new VerificationEmailService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(null);

            try {
                await service.sendVerificationEmail(user.email);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`No user with email ${user.email}`)
                );
            }
            expect.assertions(1);
        });

        test("User is already verified", async () => {
            userGenerator.setVerified();
            const user = userGenerator.generate()
            const service = new VerificationEmailService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);

            try {
                await service.sendVerificationEmail(user.email);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`User with email ${user.email} is already verified`)
                );
            }
            expect.assertions(1);
        });

        test("Throws error when deleting other email verification tokens for a user", async () => {
            const service = new VerificationEmailService();
            const user = userGenerator.generate();
            TokenService
                .prototype
                .deleteExisitingToken = jest.fn().mockRejectedValue(
                    new Error(`Failed to delete existing verification token ${user.email}`)
                );
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            
            try {
                await service.sendVerificationEmail(user.email);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to delete existing verification token ${user.email}`)
                );
            }
            expect.assertions(1);
        });

        test("Throws error when sending verification email", async () => {
            tokenGenerator.setValue("token");
            const service = new VerificationEmailService();
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            TokenService
                .prototype
                .deleteExisitingToken = jest.fn();
            TokenService
                .prototype
                .generate = jest.fn().mockResolvedValue(token);
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            SendGridMail.setApiKey = jest.fn();
            SendGridMail.send = jest.fn().mockRejectedValue(new Error());
            
            try {
                await service.sendVerificationEmail(user.email);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to send email to ${user.email}`)
                );
            }
            expect.assertions(1);
        })

        test("Sends verification email", async () => {
            tokenGenerator.setValue("token");
            const service = new VerificationEmailService();
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            TokenService
                .prototype
                .deleteExisitingToken = jest.fn();
            TokenService
                .prototype
                .generate = jest.fn().mockResolvedValue(token);
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            SendGridMail.setApiKey = jest.fn();
            SendGridMail.send = jest.fn();
            
            const verificationEmail = await service.sendVerificationEmail(user.email);

            expect(verificationEmail).toEqual(new VerificationEmailData(
                user,
                new VerificationEmailMessage(user, token).getMessage(),
                token
            ));
        })
    });
})