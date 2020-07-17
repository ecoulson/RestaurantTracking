import mongoose from "mongoose";
import * as TestDatabase from "../../../helpers/database";
import TokenModel from "../../../../src/models/Token/TokenModel";
import { generateObjectId } from "../../../helpers/mongo";
import crypto from "crypto";
import Scope from "../../../../src/services/Token/Scope";
import TokenManager from "../../../../src/services/Token/TokenManger";

mongoose.set('useCreateIndex', true);

beforeAll(async () => await TestDatabase.connect());
afterEach(async () => await TestDatabase.clearDatabase());
afterAll(async () => await TestDatabase.closeDatabase());

describe("Token Manager Suite", () => {
    describe("run", () => {
        test("Removes expired token", async () => {
            const date = new Date("2019-01-01");
            const token = new TokenModel({
                userId: generateObjectId(),
                value: crypto.randomBytes(16).toString("hex"),
                createdAt: date,
                expiresAt: date,
                schemaVersion: 0,
                updatedAt: date,
                scope: [Scope.VerifyEmail]
            })
            await token.save();
            const beforeRun = await TokenModel.findById(token._id);

            await new TokenManager().run();

            const afterRun = await TokenModel.findById(token._id);
            expect(afterRun).toEqual(null)
            expect(beforeRun.serialize()).toEqual(token.serialize());
        })
    })
})