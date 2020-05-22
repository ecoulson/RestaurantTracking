const TestDatabase = require("../helpers/database");
const Restaurant = require("../../src/models/restaurant");

beforeAll(async () => await TestDatabase.connect());
afterEach(async () => await TestDatabase.clearDatabase());
afterAll(async () => await TestDatabase.closeDatabase());

describe('Restaurant Model Suite', () => {
    describe("Create Restaurant", () => {
        test("Successfully Create Restaurant", async () => {
            let doc = new Restaurant({
                name: "Bob's Burgers",
                number: "4255035202"
            });
            await doc.save();
    
            let foundDoc = await Restaurant.findById(doc._id).exec();
    
            expect(foundDoc.toJSON()).toEqual(doc.toJSON());
        });
    });
});