import bcrypt from "bcrypt";
import faker from "faker";
import AuthenticationService from "../../../src/services/AuthenticationService";
import UserModel from "../../../src/models/user/UserModel";

beforeEach(() => {
    jest.restoreAllMocks();
});

const compare = bcrypt.compare;

describe("Authentication Service", () => {
    describe("login", () => {
        test("Should fail to login because user does not exist", async () => {
            UserModel.findByUsername = jest.fn().mockResolvedValue(null)
            const service = new AuthenticationService();
            const username = faker.internet.userName();
            const password = faker.internet.password();

            try {
                await service.login(username, password);
            } catch(error) {
                expect(error).toEqual(new Error(`No user with username ${username}`));
            }
        })

        test("Should fail to login because an error occured while finding the user", async () => {
            const username = faker.internet.userName();
            const password = faker.internet.password();
            UserModel.findByUsername = jest.fn().mockRejectedValue(new Error())
            const service = new AuthenticationService();

            try {
                await service.login(username, password);
            } catch(error) {
                expect(error).toEqual(new Error(`Error occured while finding ${username}`));
            }
        });

        test("Should fail to login because an error occured while comparing the password", async () => {
            bcrypt.compare = jest.fn().mockRejectedValue(new Error());
            const username = faker.internet.userName();
            const password = faker.internet.password();
            const user = getUser(password);
            UserModel.findByUsername = jest.fn().mockResolvedValue(user)
            const service = new AuthenticationService();

            try {
                await service.login(username, password);
            } catch(error) {
                expect(error).toEqual(
                    new Error(`Error occured while comparing password for user with id ${user._id}`)
                );
            }
        });

        test("Should fail to login because the passwords do not match", async () => {
            bcrypt.compare = compare;
            const username = faker.internet.userName();
            const password = faker.internet.password();
            const user = getUser(password);
            UserModel.findByUsername = jest.fn().mockResolvedValue(user)
            const service = new AuthenticationService();

            try {
                await service.login(username, "");
            } catch(error) {
                expect(error).toEqual(
                    new Error(`Loggin for ${user._id} failed because passwords did not match`)
                );
            }
        });

        test("Should login user", async () => {
            bcrypt.compare = compare;
            const username = faker.internet.userName();
            const password = faker.internet.password();
            const user = getUser(password);
            UserModel.findByUsername = jest.fn().mockResolvedValue(user)
            const service = new AuthenticationService();

            const foundUser = await service.login(username, password);

            expect(foundUser.serialize()).toEqual(user.serialize());
        })
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