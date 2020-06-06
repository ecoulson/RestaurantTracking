jest.mock( "@sendgrid/mail");
import UserModel from "../../../../src/models/user/UserModel";
import faker from "faker";
import VerificationEmailService from "../../../../src/services/User/VerificationEmailService";
import EmailVerificationTokenService from "../../../../src/services/Token/EmailVerificationTokenService";
import SendGridMail from "@sendgrid/mail";
import bcrypt from "bcrypt";
import Scope from "../../../../src/services/Token/Scope";
import { generateObjectId } from "../../../helpers/mongo";
import TokenModel from "../../../../src/models/token/TokenModel";

beforeAll(() => {
    process.env.HOST_NAME = "localhost"
    process.env.PORT = "8080"
});

describe("Verification Email Service Suite", () => {
    describe("Send verification email", () => {
        test("Fails to find a user with the given email", async () => {
            UserModel.findByEmail = jest.fn().mockRejectedValue(new Error());
            const user = getUser(faker.internet.password());
            const service = new VerificationEmailService();

            try {
                await service.sendVerificationEmail(user.email);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to find user with email ${user.email}`)
                );
            }
            expect.assertions(1);
        });

        test("Throws error when deleting other email verification tokens for a user", async () => {
            const service = new VerificationEmailService();
            const user = getUser(faker.internet.password());
            EmailVerificationTokenService
                .prototype
                .deleteExisitingVerificationToken = jest.fn().mockRejectedValue(
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
            const service = new VerificationEmailService();
            const user = getUser(faker.internet.password());
            const token = getToken("token");
            EmailVerificationTokenService
                .prototype
                .deleteExisitingVerificationToken = jest.fn();
            EmailVerificationTokenService
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
            const service = new VerificationEmailService();
            const user = getUser(faker.internet.password());
            const token = getToken("token");
            EmailVerificationTokenService
                .prototype
                .deleteExisitingVerificationToken = jest.fn();
            EmailVerificationTokenService
                .prototype
                .generate = jest.fn().mockResolvedValue(token);
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            SendGridMail.setApiKey = jest.fn();
            SendGridMail.send = jest.fn();
            
            const verificationEmail = await service.sendVerificationEmail(user.email);

            expect(verificationEmail).toEqual({
                user,
                token,
                message: { 
                    to: user.email,
                    from: 'support@adaptsolutions.tech',
                    subject: 'Verify Your Adapt Account',
                    dynamicTemplateData: {
                        verificationLink: `http://localhost:8080/user/verify?email=${user.email}&token=${token.value}`,
                        spamLink: `http://localhost:8080/user/spam?email=${user.email}&token=${token.value}`
                    },
                    templateId: "d-987392a0267440c7a4d329a84d5d39ff"
                }
            })
        })
    });
})

function getUser(password: string) {
    return new UserModel({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: bcrypt.hashSync(password, 1)
    })
}

function getToken(value?: string, date? : Date, userId? : string) {
    const token = new TokenModel({
        value,
        createdAt: date ? date : new Date(),
        expiresAt: new Date(),
        userId: userId ? userId : generateObjectId(),
        updatedAt: date ? date : new Date(),
        scope: [Scope.VerifyEmail]
    })
    const expirationDate = new Date(token.createdAt.valueOf());
    expirationDate.setDate(token.createdAt.getDate() + 1);

    token.expiresAt = expirationDate
    return token
}