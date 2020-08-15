import PasswordResetService from "../../../../../src/services/User/PasswordRecovery/PasswordResetService"
import UserGenerator from "../../../../mocks/Generators/UserGenerator"
import faker from "faker";
import UserModel from "../../../../../src/models/User/UserModel";
import TokenModel from "../../../../../src/models/Token/TokenModel";
import TokenGenerator from "../../../../mocks/Generators/TokenGenerator";
import Scope from "../../../../../src/services/Token/Scope";
import bcrypt from "bcrypt";
import UserBroker from "../../../../../src/brokers/UserBroker";
import TokenBroker from "../../../../../src/brokers/TokenBroker";

const userGenerator = new UserGenerator();
const tokenGenerator = new TokenGenerator();

beforeEach(() => {
    jest.resetAllMocks();
})

describe("Password Reset Service Suite", () => {
    describe("reset", () => {
        test("No user with email", async () => {
            const user = userGenerator.generate();
            const service = new PasswordResetService(
                new UserBroker(),
                new TokenBroker()
            );
            UserModel.findByEmail = jest.fn().mockResolvedValue(null);

            try {
                await service.reset(user.email, faker.internet.password(), "")
            } catch(error) {
                expect(error).toEqual(
                    new Error(`No user with email ${user.email}`)
                )
            }
            expect.assertions(1);
        })

        test("No recover token associated with account", async () => {
            tokenGenerator.setScope([Scope.VerifyEmail]);
            const token = tokenGenerator.generate();
            const user = userGenerator.generate();
            const service = new PasswordResetService(
                new UserBroker(),
                new TokenBroker()
            );
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);

            try {
                await service.reset(user.email, faker.internet.password(), "")
            } catch(error) {
                expect(error).toEqual(
                    new Error(`No password reset token associated with ${user.email}`)
                )
            }
            expect.assertions(1);
        });

        test("Token values do not match", async () => {
            tokenGenerator.setScope([Scope.ResetPassword]);
            const token = tokenGenerator.generate();
            const user = userGenerator.generate();
            const service = new PasswordResetService(
                new UserBroker(),
                new TokenBroker()
            );
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);

            try {
                await service.reset(user.email, faker.internet.password(), "")
            } catch(error) {
                expect(error).toEqual(
                    new Error(`Tokens do not match`)
                )
            }
            expect.assertions(1);
        });

        test("User confirmed password reset more than an hour ago", async () => {
            const date = new Date("2019-01-01");
            tokenGenerator.setScope([Scope.ResetPassword]);
            const token = tokenGenerator.generate();
            userGenerator.setPasswordResetDate(date)
            const user = userGenerator.generate();
            const service = new PasswordResetService(
                new UserBroker(),
                new TokenBroker()
            );
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);

            try {
                await service.reset(user.email, faker.internet.password(), token.value)
            } catch(error) {
                expect(error).toEqual(
                    new Error("Password reset window has expired")
                )
            }
            expect.assertions(1);
        });

        test("Password reset", async () => {
            tokenGenerator.setScope([Scope.ResetPassword]);
            const token = tokenGenerator.generate();
            userGenerator.setPasswordResetDate(new Date())
            const user = userGenerator.generate();
            const service = new PasswordResetService(
                new UserBroker(),
                new TokenBroker()
            );
            const newPassword = faker.internet.password();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);
            TokenModel.prototype.remove = jest.fn();
            UserModel.prototype.save = jest.fn();
            bcrypt.hash = jest.fn().mockResolvedValue(newPassword);

            const updatedUser = await service.reset(user.email, newPassword, token.value);

            expect(updatedUser.password).toEqual(newPassword);
        });
    })
})