jest.mock( "@sendgrid/mail");
import UserService from "../../../../src/services/User/UserService"
import IRegistrationBody from "../../../../src/controllers/User/IRegistrationBody";
import faker from "faker";
import bcrypt from "bcrypt";
import UserModel from "../../../../src/models/user/UserModel";
import EmailVerificationTokenService from "../../../../src/services/Token/EmailVerificationTokenService";
import TokenModel from "../../../../src/models/token/TokenModel";
import { generateObjectId } from "../../../helpers/mongo";
import Scope from "../../../../src/services/Token/Scope";
import sgMail from "@sendgrid/mail";

beforeAll(() => {
    process.env.HOST_NAME = "localhost"
    process.env.PORT = "8080"
});

const hash = bcrypt.hash;

beforeEach(() => {
    bcrypt.hash = hash;
});

describe("User Service Suite", () => {
    describe("register", () => {
        test("An error occurs while saving a user to the database", async () => {
            bcrypt.hash = jest.fn().mockRejectedValue(new Error());
            const service = new UserService();
            const registration : IRegistrationBody = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                username: faker.internet.userName() 
            }

            try {
                await service.register(registration);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to hash password for registering user ${registration.username}`)
                )
            }
            expect.assertions(1);
        })

        test("An error occurs while saving a user to the database", async () => {
            UserModel.findByUsername = jest.fn().mockResolvedValue(null);
            UserModel.findByEmail = jest.fn().mockResolvedValue(null);
            UserModel.prototype.save = jest.fn().mockRejectedValue(new Error());
            const service = new UserService();
            const registration : IRegistrationBody = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                username: faker.internet.userName() 
            }

            try {
                await service.register(registration);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to save user with username ${registration.username} to the database`)
                )
            }
            expect.assertions(1);
        })

        test("Username has been taken", async () => {
            const service = new UserService();
            const registration : IRegistrationBody = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                username: faker.internet.userName() 
            }
            UserModel.findByUsername = jest.fn().mockResolvedValue(registration);

            try {
                await service.register(registration);
            } catch(error) {
                expect(error).toEqual(new Error(`Username ${registration.username} already exists`));
            }
            expect.assertions(1);
        })

        test("An error occurs while checking for unique username", async () => {
            UserModel.findByUsername = jest.fn().mockRejectedValue(new Error());
            const service = new UserService();
            const registration : IRegistrationBody = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                username: faker.internet.userName() 
            }

            try {
                await service.register(registration);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to check if username ${registration.username} already exists`)
                )
            }
            expect.assertions(1);
        })

        test("Account already associated with an email", async () => {
            const service = new UserService();
            const registration : IRegistrationBody = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                username: faker.internet.userName() 
            }
            UserModel.findByUsername = jest.fn().mockResolvedValue(null);
            UserModel.findByEmail = jest.fn().mockResolvedValue(registration);

            try {
                await service.register(registration);
            } catch(error) {
                expect(error).toEqual(
                    new Error(`Email ${registration.email} is associated with another account`)
                );
            }
            expect.assertions(1);
        })

        test("An error occurs while checking for unique email", async () => {
            UserModel.findByUsername = jest.fn().mockResolvedValue(null);
            UserModel.findByEmail = jest.fn().mockRejectedValue(new Error());
            const service = new UserService();
            const registration : IRegistrationBody = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                username: faker.internet.userName() 
            }

            try {
                await service.register(registration);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to check if email ${registration.email} already exists`)
                )
            }
            expect.assertions(1);
        })

        test("Registers a user to the database", async () => {
            UserModel.prototype.save = jest.fn();
            UserModel.findByUsername = jest.fn().mockResolvedValue(null);
            UserModel.findByEmail = jest.fn().mockResolvedValue(null);
            const service = new UserService();
            const registration : IRegistrationBody = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                username: faker.internet.userName() 
            }

            const user = await service.register(registration);

            expect(user.firstName).toEqual(registration.firstName);
            expect(user.lastName).toEqual(registration.lastName);
            expect(user.email).toEqual(registration.email);
            expect(await bcrypt.compare(registration.password, user.password));
            expect(user.username).toEqual(registration.username);
        })
    });

    describe("Send verification email", () => {
        test("Fails to find a user with the given email", async () => {
            UserModel.findByEmail = jest.fn().mockRejectedValue(new Error());
            const user = getUser(faker.internet.password());
            const service = new UserService();

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
            const service = new UserService();
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
            const service = new UserService();
            const user = getUser(faker.internet.password());
            const token = getToken("token");
            EmailVerificationTokenService
                .prototype
                .deleteExisitingVerificationToken = jest.fn();
            EmailVerificationTokenService
                .prototype
                .generate = jest.fn().mockResolvedValue(token);
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            sgMail.setApiKey = jest.fn();
            sgMail.send = jest.fn().mockRejectedValue(new Error());
            
            try {
                await service.sendVerificationEmail(user.email);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to send email for ${user.email}`)
                );
            }
            expect.assertions(1);
        })

        test("Sends verification email", async () => {
            const service = new UserService();
            const user = getUser(faker.internet.password());
            const token = getToken("token");
            EmailVerificationTokenService
                .prototype
                .deleteExisitingVerificationToken = jest.fn();
            EmailVerificationTokenService
                .prototype
                .generate = jest.fn().mockResolvedValue(token);
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            sgMail.setApiKey = jest.fn();
            sgMail.send = jest.fn();
            
            const verificationEmail = await service.sendVerificationEmail(user.email);

            expect(verificationEmail).toEqual({
                user,
                token,
                message: { 
                    to: user.email,
                    from: 'support@adaptsolutions.tech',
                    subject: 'Verification',
                    text: 'Verification email',
                    html: `<a href=http://localhost:8080/user/verify?email=${user.email}&token=${token.value}>Verify Account</a>` 
                }
            })
        })
    });

    describe("verify", () => {
        test("Error occured while finding user by email", async () => {
            UserModel.findByEmail = jest.fn().mockRejectedValue(new Error());
            const user = getUser(faker.internet.password());
            const token = getToken();
            const service = new UserService();

            try {
                await service.verify(token.value, user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to find user with email ${user.email}`))
            }
            expect.assertions(1);
        });

        test("No user with email", async () => {
            UserModel.findByEmail = jest.fn().mockResolvedValue(null);
            const user = getUser(faker.internet.password());
            const token = getToken();
            const service = new UserService();

            try {
                await service.verify(token.value, user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`No user with email ${user.email}`))
            }
            expect.assertions(1);
        });

        test("User is already verified", async () => {
            const user = getUser(faker.internet.password());
            user.verified = true;
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            const token = getToken();
            const service = new UserService();

            try {
                await service.verify(token.value, user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`User with email ${user.email} is already verified`))
            }
            expect.assertions(1);
        });

        test("Error occured while finding email verification token", async () => {
            const user = getUser(faker.internet.password());
            const token = getToken();
            const service = new UserService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockRejectedValue(new Error());

            try {
                await service.verify(token.value, user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to find tokens associated with user ${user._id}`));
            }
            expect.assertions(1);
        });

        test("No verification tokens associated with the user", async () => {
            const user = getUser(faker.internet.password());
            const token = getToken();
            token.scope = [Scope.ForgotPassword];
            const service = new UserService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);

            try {
                await service.verify(token.value, user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`User ${user._id} has no active email verification tokens`));
            }
            expect.assertions(1);
        });

        test("Token does not match the database value", async () => {
            const user = getUser(faker.internet.password());
            const token = getToken();
            const service = new UserService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);

            try {
                await service.verify("fake token", user.email);
            } catch (error) {
                expect(error).toEqual(new Error("Incorrect verification token provided"));
            }
            expect.assertions(1);
        });

        test("Fails to verify user in database", async () => {
            const user = getUser(faker.internet.password());
            const token = getToken();
            const service = new UserService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);
            UserModel.prototype.save = jest.fn().mockRejectedValue(new Error());

            try {
                await service.verify(token.value, user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to update verification status of user ${user._id}`));
            }
            expect.assertions(1);
        });

        test("Fails to delete email verification token", async () => {
            const user = getUser(faker.internet.password());
            const token = getToken();
            const service = new UserService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);
            UserModel.prototype.save = jest.fn();
            TokenModel.prototype.remove = jest.fn().mockRejectedValue(new Error())

            try {
                await service.verify(token.value, user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to delete verification token for user ${user._id}`));
            }
            expect.assertions(1);
        });

        test("Verifies user", async () => {
            const user = getUser(faker.internet.password());
            const token = getToken();
            const service = new UserService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);
            UserModel.prototype.save = jest.fn();
            TokenModel.prototype.remove = jest.fn()

            const verifiedUser = await service.verify(token.value, user.email);

            user.verified = true;
            expect(verifiedUser.serialize()).toEqual(user.serialize());
        });
    })
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