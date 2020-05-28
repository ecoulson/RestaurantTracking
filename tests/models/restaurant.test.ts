import faker from 'faker';
import * as TestDatabase from "../helpers/database";
import Restaurant from "../../src/models/restaurant";

beforeAll(async () => await TestDatabase.connect());
afterEach(async () => await TestDatabase.clearDatabase());
afterAll(async () => await TestDatabase.closeDatabase());

describe('Restaurant Model Suite', () => {
    describe("Create Restaurant", () => {
        test("Successfully Create Restaurant", async () => {
            let doc = new Restaurant({
                name: faker.company.companyName(),
                number: faker.phone.phoneNumber(),
                url: faker.internet.url()
            });
            await doc.save();
    
            let foundDoc = await Restaurant.findById(doc._id).exec();
    
            expect(foundDoc.toJSON()).toEqual(doc.toJSON());
        });
    });
});