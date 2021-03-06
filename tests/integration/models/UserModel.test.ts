import UserModel from "../../../src/models/User/UserModel";
import * as TestDatabase from "../../helpers/database";
import faker from "faker";
import mongoose from "mongoose";

mongoose.set('useCreateIndex', true);

beforeAll(async () => await TestDatabase.connect());
afterEach(async () => await TestDatabase.clearDatabase());
afterAll(async () => await TestDatabase.closeDatabase());

describe("User Model Suite", () => {
    describe("Creates a user model", () => {
        test("Checks the serialization of a newly created user", async () => {
            const newUser = new UserModel({
                username: faker.internet.userName(),
                password: faker.internet.password(),
                email: faker.internet.email(),
                firstName: faker.name.findName(),
                lastName: faker.name.lastName()
            });

            const userDocument = await newUser.save();

            const foundUser = await UserModel.findById(userDocument._id);
            expect(JSON.stringify(foundUser.serialize())).toEqual(JSON.stringify(userDocument.serialize()))
        })
    });

    describe("Finds a model by username", () => {
        test("Finds a user by username", async () => {
            const username = faker.internet.userName();
            const newUser = new UserModel({
                username,
                password: faker.internet.password(),
                email: faker.internet.email(),
                firstName: faker.name.findName(),
                lastName: faker.name.lastName()
            });
            const userDocument = await newUser.save();

            const foundUser = await UserModel.findByUsername(username);
            expect(JSON.stringify(foundUser.serialize())).toEqual(JSON.stringify(userDocument.serialize()));
        })
    });

    describe("Finds a model by email", () => {
        test("Finds a user by email", async () => {
            const username = faker.internet.userName();
            const newUser = new UserModel({
                username,
                password: faker.internet.password(),
                email: faker.internet.email(),
                firstName: faker.name.findName(),
                lastName: faker.name.lastName()
            });
            const userDocument = await newUser.save();

            const foundUser = await UserModel.findByEmail(newUser.email);
            expect(JSON.stringify(foundUser.serialize())).toEqual(JSON.stringify(userDocument.serialize()));
        })
    })
})