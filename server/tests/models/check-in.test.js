const TestDatabase = require("../helpers/database");
const CheckIn = require("../../src/models/check-in");
const faker = require('faker');

beforeAll(async () => await TestDatabase.connect());
afterEach(async () => await TestDatabase.clearDatabase());
afterAll(async () => await TestDatabase.closeDatabase());

describe('Check In Model Suite', () => {
    describe("Create Check In", () => {
        test("Successfully Create Check In By Email", async () => {
            const expectedCheckIn = await createEmailCheckIn("1");
    
            let foundCheckIn = await CheckIn.findById(expectedCheckIn._id).exec();
    
            expect(foundCheckIn.serialize()).toEqual(expectedCheckIn.serialize());
        });

        test("Successfully Create Check In By Phone Number", async () => {
            const expectedCheckIn = await createPhoneNumberCheckIn("1");
    
            let foundCheckIn = await CheckIn.findById(expectedCheckIn._id).exec();
    
            expect(foundCheckIn.serialize()).toEqual(expectedCheckIn.serialize());
        });
    });

    describe("Find By Restaurant Id", () => {
        test("Finds All By Restaurant Id", async () => {
            const checkInA = await createPhoneNumberCheckIn("1");
            const checkInB = await createEmailCheckIn("1");
            await createEmailCheckIn("2");

            let checkInEvents = await CheckIn.findByRestaurantId("1");
            checkInEvents = checkInEvents.map((checkInEvent) => {
                return checkInEvent.serialize();
            })

            expect(checkInEvents).toEqual([ checkInA.serialize(), checkInB.serialize() ]);
        })
    })
});

async function createEmailCheckIn(id) {
    let doc = new CheckIn({
        email: faker.internet.email(),
        restaurantId: id
    });
    return await doc.save();
}

async function createPhoneNumberCheckIn(id) {
    let doc = new CheckIn({
        number: faker.phone.phoneNumber(),
        restaurantId: id
    });
    return await doc.save();
}