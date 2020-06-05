import mongoose from "mongoose";
import * as TestDatabase from "../../helpers/database";
import TokenModel from "../../../src/models/token/TokenModel";
import { generateObjectId } from "../../helpers/mongo";
import crypto from "crypto";
import Scope from "../../../src/services/Token/Scope";

mongoose.set('useCreateIndex', true);

beforeAll(async () => await TestDatabase.connect());
afterEach(async () => await TestDatabase.clearDatabase());
afterAll(async () => await TestDatabase.closeDatabase());

describe("Token Model Suite", () => {
    describe("Saving Token", () => {
        test("Saves a token to the database", async () => {
            const date = new Date();
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

            const foundToken = await TokenModel.findById(token._id);

            expect(foundToken.serialize()).toEqual(foundToken.serialize())
        })
    })

    describe("Finding token by user id", () => {
        test("Find token by userId", async () => {
            const date = new Date();
            const objectId = generateObjectId();
            const token = new TokenModel({
                userId: objectId,
                value: crypto.randomBytes(16).toString("hex"),
                createdAt: date,
                expiresAt: date,
                schemaVersion: 0,
                updatedAt: date,
                scope: [Scope.VerifyEmail]
            })
            await token.save();

            const foundTokens = await TokenModel.findByUserId(objectId);

            expect(token.serialize()).toEqual(foundTokens[0].serialize());
        })
    })
})