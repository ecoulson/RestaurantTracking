import bcrypt from "bcrypt";
import faker from "faker";
import UserRegistrationService from "../../../../src/services/User/UserRegistrationService";
import IRegistrationBody from "../../../../src/controllers/User/IRegistrationBody";
import UserModel from "../../../../src/models/user/UserModel";

const hash = bcrypt.hash;

beforeEach(() => {
    bcrypt.hash = hash;
});

describe("User Registration Service Suite", () => {
    describe("register", () => {
        test("An error occurs while saving a user to the database", async () => {
            bcrypt.hash = jest.fn().mockRejectedValue(new Error());
            const service = new UserRegistrationService();
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
            const service = new UserRegistrationService();
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
            const service = new UserRegistrationService();
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
            const service = new UserRegistrationService();
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
            const service = new UserRegistrationService();
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
            const service = new UserRegistrationService();
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
            const service = new UserRegistrationService();
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
})