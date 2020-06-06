import bcrypt from "bcrypt";
import faker from "faker";
import AuthenticationService from "../../../../src/services/Authentication/AuthenticationService";
import UserModel from "../../../../src/models/user/UserModel";
import jsonwebtoken from "jsonwebtoken";

const compare = bcrypt.compare;

beforeAll(() => {
    process.env.ACCESS_TOKEN_SECRET = "valid"
});

beforeEach(() => {
    bcrypt.compare = compare;
    jest.resetAllMocks();
});


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
            expect.assertions(1);
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
            expect.assertions(1);
        });

        test("Should fail to login because the passwords do not match", async () => {
            const username = faker.internet.userName();
            const password = faker.internet.password();
            const user = getUser(password);
            user.verified = false;
            UserModel.findByUsername = jest.fn().mockResolvedValue(user)
            const service = new AuthenticationService();

            try {
                await service.login(username, "");
            } catch(error) {
                expect(error).toEqual(
                    new Error(`User ${user._id} is not verified`)
                );
            }
            expect.assertions(1);
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
            expect.assertions(1);
        });

        test("Should fail to login because the passwords do not match", async () => {
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
            expect.assertions(1);
        });

        test("Should login user", async () => {
            const username = faker.internet.userName();
            const password = faker.internet.password();
            const user = getUser(password);
            UserModel.findByUsername = jest.fn().mockResolvedValue(user)
            const service = new AuthenticationService();

            const foundUser = await service.login(username, password);

            expect(foundUser.serialize()).toEqual(user.serialize());
        })
    });

    describe("generateAccessToken", () => {
        test("should throw an error when generating token", () => {
            const user = getUser(faker.internet.password());
            const service = new AuthenticationService();
            jsonwebtoken.sign = jest.fn().mockImplementation(() => {
                throw new Error();
            })
            
            try {
                service.generateAccessToken(user);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to generate access token for user id ${user._id}`)
                );
            }
            expect.assertions(1);
        })

        test("should generate an access token", () => {
            const user = getUser(faker.internet.password());
            const service = new AuthenticationService();
            
            const accessToken = service.generateAccessToken(user);

            expect(accessToken).toEqual(jsonwebtoken.sign({
                _id: user._id
            }, process.env.ACCESS_TOKEN_SECRET));
        })
    })
})

function getUser(password: string) {
    return new UserModel({
        verified: true,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: bcrypt.hashSync(password, 1)
    })
}