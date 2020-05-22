const TestDatabase = require("../helpers/database");
const CheckIn = require("../../src/models/check-in");

beforeAll(async () => await TestDatabase.connect());
afterEach(async () => await TestDatabase.clearDatabase());
afterAll(async () => await TestDatabase.closeDatabase());

describe('Check In Model Suite', () => {
    describe("Create Check In", () => {
        test("Successfully Create Check In", async () => {
            const expectedCheckIn = await createCheckIn("1");
    
            let foundCheckIn = await CheckIn.findById(expectedCheckIn._id).exec();
    
            expect(foundCheckIn.serialize()).toEqual(expectedCheckIn.serialize());
        });
    });

    describe("Find By Restaurant Id", () => {
        test("Finds All By Restaurant Id", async () => {
            const checkInA = await createCheckIn("1");
            const checkInB = await createCheckIn("1");
            await createCheckIn("2");

            let checkInEvents = await CheckIn.findByRestaurantId("1");
            checkInEvents = checkInEvents.map((checkInEvent) => {
                return checkInEvent.serialize();
            })

            expect(checkInEvents).toEqual([ checkInA.serialize(), checkInB.serialize() ]);
        })
    })
});

async function createCheckIn(id) {
    let doc = new CheckIn({
        number: "4255035202",
        restaurantId: id
    });
    return await doc.save();
}