import * as TestDatabase from "../../helpers/database";
import CheckInModel from "../../../src/models/CheckIn/CheckInModel";
import faker from 'faker';
import { generateObjectId } from "../../helpers/mongo";
import mongoose from "mongoose"

mongoose.set('useCreateIndex', true);

beforeAll(async () => await TestDatabase.connect());
afterEach(async () => await TestDatabase.clearDatabase());
afterAll(async () => await TestDatabase.closeDatabase());

describe('Check In Model Suite', () => {
    describe("Create Check In", () => {
        test("Successfully Create Check In By Email", async () => {
            const expectedCheckIn = await createCheckIn("1");
    
            let foundCheckIn = await CheckInModel.findById(expectedCheckIn._id).exec();
    
            expect(foundCheckIn.serialize()).toEqual(expectedCheckIn.serialize());
        });

        test("Successfully Create Check In By Phone Number", async () => {
            const expectedCheckIn = await createCheckIn("1");
    
            let foundCheckIn = await CheckInModel.findById(expectedCheckIn._id).exec();
    
            expect(foundCheckIn.serialize()).toEqual(expectedCheckIn.serialize());
        });

        test("Successfully Create Check In With Time Checked In", async () => {
            const expectedCheckIn = await createCheckIn("1");
            expectedCheckIn.timeCheckedIn = faker.date.recent();
            await expectedCheckIn.save();
    
            let foundCheckIn = await CheckInModel.findById(expectedCheckIn._id).exec();
    
            expect(foundCheckIn.serialize()).toEqual(expectedCheckIn.serialize());
        });
    });

    describe("Find By Restaurant Id", () => {
        test("Finds All By Restaurant Id", async () => {
            const checkInA = await createCheckIn("1");
            const checkInB = await createCheckIn("1");
            await createCheckIn("2");

            let checkInEvents = await CheckInModel.findByOrganizationId("1");
            checkInEvents = checkInEvents.map((checkInEvent) => {
                return checkInEvent.serialize();
            })

            expect(checkInEvents).toEqual([ checkInA.serialize(), checkInB.serialize() ]);
        })
    })
});

async function createCheckIn(id: string) {
    let doc = new CheckInModel({
        building: faker.name.firstName(),
        userId: generateObjectId(),
        organizationId: id,
        ipAddress: faker.internet.ip(),
        timeCheckedIn: faker.date.recent()
    })
    return await doc.save();
}