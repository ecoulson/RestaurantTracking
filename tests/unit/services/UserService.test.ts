import UserService from "../../../src/services/UserService"
import IRegistrationBody from "../../../src/controllers/User/IRegistrationBody";
import faker from "faker";
import bcrypt from "bcrypt";
import UserModel from "../../../src/models/user/UserModel";

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

        test("Registers a user to the database", async () => {
            UserModel.prototype.save = jest.fn();
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
    })
})