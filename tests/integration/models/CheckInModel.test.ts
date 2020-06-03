import * as TestDatabase from "../../helpers/database";
import CheckInModel from "../../../src/models/check-in/CheckInModel";
import faker from 'faker';

beforeAll(async () => await TestDatabase.connect());
afterEach(async () => await TestDatabase.clearDatabase());
afterAll(async () => await TestDatabase.closeDatabase());

describe('Check In Model Suite', () => {
    describe("Create Check In", () => {
        test("Successfully Create Check In By Email", async () => {
            const expectedCheckIn : any = await createEmailCheckIn("1");
    
            let foundCheckIn : any = await CheckInModel.findById(expectedCheckIn._id).exec();
    
            expect(foundCheckIn.serialize()).toEqual(expectedCheckIn.serialize());
        });

        test("Successfully Create Check In By Phone Number", async () => {
            const expectedCheckIn : any = await createPhoneNumberCheckIn("1");
    
            let foundCheckIn : any = await CheckInModel.findById(expectedCheckIn._id).exec();
    
            expect(foundCheckIn.serialize()).toEqual(expectedCheckIn.serialize());
        });

        test("Successfully Create Check In With Time Checked In", async () => {
            const expectedCheckIn : any = await createPhoneNumberCheckIn("1");
            expectedCheckIn.timeCheckedIn = faker.date.recent();
    
            let foundCheckIn : any = await CheckInModel.findById(expectedCheckIn._id).exec();
    
            expect(foundCheckIn.serialize()).toEqual(expectedCheckIn.serialize());
        });
    });

    describe("Find By Restaurant Id", () => {
        test("Finds All By Restaurant Id", async () => {
            const checkInA : any = await createPhoneNumberCheckIn("1");
            const checkInB : any = await createEmailCheckIn("1");
            await createEmailCheckIn("2");

            let checkInEvents = await CheckInModel.findByRestaurantId("1");
            checkInEvents = checkInEvents.map((checkInEvent) => {
                return checkInEvent.serialize();
            })

            expect(checkInEvents).toEqual([ checkInA.serialize(), checkInB.serialize() ]);
        })
    })
});

async function createEmailCheckIn(id : string) {
    let doc = new CheckInModel({
        email: faker.internet.email(),
        restaurantId: id,
        ipAddress: "::1"
    });
    return await doc.save();
}

async function createPhoneNumberCheckIn(id : string) {
    let doc = new CheckInModel({
        number: faker.phone.phoneNumber(),
        restaurantId: id,
        ipAddress: "::1"
    });
    return await doc.save();
}