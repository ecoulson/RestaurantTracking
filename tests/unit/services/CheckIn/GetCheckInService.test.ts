import CheckInBroker from "../../../../src/brokers/CheckInBroker"
import GetCheckInService from "../../../../src/services/CheckIn/GetCheckInService";
import { generateObjectId } from "../../../helpers/mongo";
import CheckInGenerator from "../../../mocks/Generators/CheckInGenerator";

const checkInGenerator = new CheckInGenerator();

describe("Get Check In Test Suite", () => {
    test("No check in with id", async () => {
        CheckInBroker.prototype.getCheckInById =
            jest.fn().mockResolvedValue(null);
        const service = new GetCheckInService(new CheckInBroker());
        const id = generateObjectId();

        try {
            await service.getCheckIn(id);
        } catch(error) {
            expect(error).toEqual(new Error(`No check in with id: ${id}`))
        }

        expect.assertions(1);
    })

    test("Get check in with id", async () => {
        const checkIn = checkInGenerator.generate();
        CheckInBroker.prototype.getCheckInById =
            jest.fn().mockResolvedValue(checkIn);
        const service = new GetCheckInService(new CheckInBroker());
        
        const resultingCheckIn = await service.getCheckIn(checkIn._id);

        expect(resultingCheckIn).toEqual(checkIn)
    })
})