import CheckInBroker from "../../../../src/brokers/CheckInBroker"
import CheckoutService from "../../../../src/services/CheckIn/CheckoutService";
import { generateObjectId } from "../../../helpers/mongo";
import CheckInGenerator from "../../../mocks/Generators/CheckInGenerator";

const checkInGenerator = new CheckInGenerator();

describe("Checkout Service", () => {
    test("No check in with id", async () => {
        CheckInBroker.prototype.getCheckInById =
            jest.fn().mockResolvedValue(null);
        const id = generateObjectId();
        const service = new CheckoutService(new CheckInBroker())

        try {
            await service.checkout(id)
        } catch (error) {
            expect(error).toEqual(new Error(`No check in with id: ${id}`))
        }
        
        expect.assertions(1);
    })

    test("Checks out existing check in", async () => {
        const checkIn = checkInGenerator.generate();
        CheckInBroker.prototype.getCheckInById =
            jest.fn().mockResolvedValue(checkIn);
        CheckInBroker.prototype.save =
            jest.fn().mockImplementation(checkIn => checkIn)
        const service = new CheckoutService(new CheckInBroker());

        await service.checkout(checkIn._id)

        expect(checkIn.checkedOut).toBeTruthy();
    });
})