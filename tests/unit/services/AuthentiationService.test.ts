import faker from "faker";
import AuthenticationService from "../../../src/services/AuthenticationService";
import UserModel from "../../../src/models/user/UserModel";

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

        test("Should fail to login because an error occured while loggin in the user", async () => {
            const username = faker.internet.userName();
            const password = faker.internet.password();
            UserModel.findByUsername = jest.fn().mockResolvedValue(new Error())
            const service = new AuthenticationService();

            try {
                await service.login(username, password);
            } catch(error) {
                expect(error).toEqual(new Error(`Error occured while finding ${username}`));
            }
        });

        test("Should fail to login because an error occured while comparing the password", async () => {
            const username = faker.internet.userName();
            const password = faker.internet.password();
            const user = getUser(password);
            UserModel.findByUsername = jest.fn().mockResolvedValue(user)
            const service = new AuthenticationService();

            try {
                await service.login(username, password);
            } catch(error) {
                expect(error).toEqual(new Error(`Error occured while finding ${username}`));
            }
        })
    })
})

function getUser(password?: string) {
    return new UserModel({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: password ? password : faker.internet.password()
    })
}