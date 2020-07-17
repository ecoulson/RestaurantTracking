import bcrypt from "bcrypt";
import AuthenticationService from "../../../../src/services/Authentication/AuthenticationService";
import UserModel from "../../../../src/models/User/UserModel";
import jsonwebtoken from "jsonwebtoken";
import UserGenerator from "../../../mocks/Generators/UserGenerator";
import LoginArguments from "../../../../src/services/Authentication/LoginArguments";

const compare = bcrypt.compare;
const userGenerator = new UserGenerator();

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
            const service = new AuthenticationService();
            const user = userGenerator.generate();
            UserModel.findByUsername = jest.fn().mockResolvedValue(null)

            try {
                await service.login(new LoginArguments(user.username, user.password));
            } catch(error) {
                expect(error).toEqual(new Error(`No user with username ${user.username}`));
            }
            expect.assertions(1);
        })

        test("Should fail to login because an error occured while finding the user", async () => {
            const user = userGenerator.generate();
            const service = new AuthenticationService();
            UserModel.findByUsername = jest.fn().mockRejectedValue(new Error())

            try {
                await service.login(new LoginArguments(user.username, user.password));
            } catch(error) {
                expect(error).toEqual(new Error(`Error ocurred while finding ${user.username}`));
            }
            expect.assertions(1);
        });

        test("Should fail to login because the passwords do not match", async () => {
            const user = userGenerator.generate();
            const service = new AuthenticationService();
            UserModel.findByUsername = jest.fn().mockResolvedValue(user)

            try {
                await service.login(new LoginArguments(user.username, ""));
            } catch(error) {
                expect(error).toEqual(
                    new Error(`Login for ${user._id} failed because passwords did not match`)
                );
            }
            expect.assertions(1);
        });

        test("Should fail to login because an error ocurred while comparing the password", async () => {
            userGenerator.setVerified();
            const user = userGenerator.generate();
            const service = new AuthenticationService();
            bcrypt.compare = jest.fn().mockRejectedValue(new Error());
            UserModel.findByUsername = jest.fn().mockResolvedValue(user)

            try {
                await service.login(new LoginArguments(user.username, user.password));
            } catch(error) {
                expect(error).toEqual(
                    new Error(`Error ocurred while comparing password for user with id ${user._id}`)
                );
            }
            expect.assertions(1);
        });

        test("Should fail to login because the passwords do not match", async () => {
            userGenerator.setVerified();
            const user = userGenerator.generate();
            const service = new AuthenticationService();
            UserModel.findByUsername = jest.fn().mockResolvedValue(user)

            try {
                await service.login(new LoginArguments(user.username, ""));
            } catch(error) {
                expect(error).toEqual(
                    new Error(`Login for ${user._id} failed because passwords did not match`)
                );
            }
            expect.assertions(1);
        });

        test("Should redirect unverified user", async () => {
            userGenerator.setVerified();
            const user = userGenerator.generate();
            const service = new AuthenticationService();
            const password = user.password;
            user.password = bcrypt.hashSync(user.password, 10)
            UserModel.findByUsername = jest.fn().mockResolvedValue(user);

            const foundUser = await service.login(new LoginArguments(user.username, password));

            expect(foundUser.serialize()).toEqual(user.serialize());
        })

        test("Should login user", async () => {
            userGenerator.setVerified();
            const user = userGenerator.generate();
            const service = new AuthenticationService();
            const password = user.password;
            user.password = bcrypt.hashSync(user.password, 10)
            UserModel.findByUsername = jest.fn().mockResolvedValue(user);

            const foundUser = await service.login(new LoginArguments(user.username, password));

            expect(foundUser.serialize()).toEqual(user.serialize());
        })
    });

    describe("generateAccessToken", () => {
        test("should throw an error when generating token", () => {
            const user = userGenerator.generate();
            const service = new AuthenticationService();
            jsonwebtoken.sign = jest.fn().mockImplementation(() => {
                throw new Error();
            })
            
            try {
                service.generateAccessToken(user, false);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to generate access token for user id ${user._id}`)
                );
            }
            expect.assertions(1);
        })

        test("should generate an access token", () => {
            const user = userGenerator.generate();
            const service = new AuthenticationService();
            
            const accessToken = service.generateAccessToken(user, false);

            expect(accessToken).toEqual(jsonwebtoken.sign({
                _id: user._id
            }, process.env.ACCESS_TOKEN_SECRET));
        })
    })
})