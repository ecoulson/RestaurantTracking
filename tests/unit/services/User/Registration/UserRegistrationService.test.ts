import bcrypt from "bcrypt";
import UserRegistrationService from "../../../../../src/services/User/Registration/UserRegistrationService";
import IRegistrationBody from "../../../../../src/controllers/User/Registration/IRegistrationBody";
import RegistrationBodyGenerator from "../../../../mocks/Generators/RegistrationBodyGenerator";
import UserBroker from "../../../../../src/brokers/UserBroker";
jest.mock("../../../../../src/brokers/UserBroker");

const hash = bcrypt.hash;

beforeEach(() => {
    bcrypt.hash = hash;
});

const registrationGenerator = new RegistrationBodyGenerator();

describe("User Registration Service Suite", () => {
    describe("register", () => {
        test("An error occurs while saving a user to the database", async () => {
            const service = new UserRegistrationService(
                new UserBroker()
            );
            const registration : IRegistrationBody = registrationGenerator.generate();
            bcrypt.hash = jest.fn().mockRejectedValue(new Error());

            try {
                await service.register(registration);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to hash password for registering user ${registration.username}`)
                )
            }
            expect.assertions(1);
        })

        test("Username has been taken", async () => {
            const registration : IRegistrationBody = registrationGenerator.generate();
            UserBroker.prototype.findUserByUsername = jest.fn().mockResolvedValue(registration);
            const service = new UserRegistrationService(
                new UserBroker()
            );

            try {
                await service.register(registration);
            } catch(error) {
                expect(error).toEqual(new Error(`Username ${registration.username} already exists`));
            }
            expect.assertions(1);
        })

        test("Account already associated with an email", async () => {
            const registration : IRegistrationBody = registrationGenerator.generate();
            UserBroker.prototype.findUserByUsername = jest.fn().mockResolvedValue(null);
            UserBroker.prototype.findUserByEmail = jest.fn().mockResolvedValue(registration);
            const service = new UserRegistrationService(
                new UserBroker()
            );

            try {
                await service.register(registration);
            } catch(error) {
                expect(error).toEqual(
                    new Error(`Email ${registration.email} is associated with another account`)
                );
            }
            expect.assertions(1);
        })

        test("Registers a user to the database", async () => {
            const registration : IRegistrationBody = registrationGenerator.generate();
            UserBroker.prototype.save = jest.fn().mockResolvedValue(registration);
            UserBroker.prototype.findUserByUsername = jest.fn().mockResolvedValue(null);
            UserBroker.prototype.findUserByEmail = jest.fn().mockResolvedValue(null);
            const service = new UserRegistrationService(
                new UserBroker()
            );

            const user = await service.register(registration);

            expect(user.firstName).toEqual(registration.firstName);
            expect(user.lastName).toEqual(registration.lastName);
            expect(user.email).toEqual(registration.email);
            expect(await bcrypt.compare(registration.password, user.password));
            expect(user.username).toEqual(registration.username);
        })
    });
})