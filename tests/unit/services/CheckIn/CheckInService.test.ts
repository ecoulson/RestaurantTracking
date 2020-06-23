import RestaurantModel from "../../../../src/models/restaurant/RestaurantModel";
import CheckInService from "../../../../src/services/CheckIn/CheckInService";
import CheckInModel from "../../../../src/models/check-in/CheckInModel";
import faker from "faker";
import CSV from "../../../../src/lib/HTTP/CSV";
import CheckInBodyGenerator from "../../../mocks/Generators/CheckInBodyGenerator";
import RestaurantGenerator from "../../../mocks/Generators/RestaurantGenerator";
import CheckInGenerator from "../../../mocks/Generators/CheckInGenerator";

const checkInBodyGenerator = new CheckInBodyGenerator();
const checkInGenerator = new CheckInGenerator();
const restaurantGenerator = new RestaurantGenerator();

describe("Checkin Service Test", () => {
    describe("checkIn", () => {
        test("A an error when saving for restaurant with an id", async () => {
            const service = new CheckInService();
            const restaurant = restaurantGenerator.generate();
            checkInBodyGenerator.setRestaurantId(restaurant._id)
            const checkInBody = checkInBodyGenerator.generate();
            const ip = faker.internet.ip()
            CheckInModel.prototype.save = jest.fn().mockRejectedValue(checkInBody);
            RestaurantModel.findById = jest.fn().mockResolvedValue(restaurant);

            try {
                await service.checkIn(checkInBody, ip);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Error when saving checkin to restaurant with ${restaurant._id} from ${ip}`
                ));
            }
            expect.assertions(1);
        });

        test("A an error when finding restaurant during checkin", async () => {
            const service = new CheckInService();
            const restaurant = restaurantGenerator.generate();
            checkInBodyGenerator.setRestaurantId(restaurant._id)
            const checkInBody = checkInBodyGenerator.generate();
            CheckInModel.prototype.save = jest.fn().mockResolvedValue(checkInBody);
            RestaurantModel.findById = jest.fn().mockRejectedValue(new Error());

            try {
                await service.checkIn(checkInBody, faker.internet.ip());
            } catch (error) {
                expect(error).toEqual(new Error(`Error when finding restaurant with ${restaurant._id}`));
            }
            expect.assertions(1);
        });

        test("A checkin to a restaurant that does not exist", async () => {
            const service = new CheckInService();
            CheckInModel.prototype.save = jest.fn().mockResolvedValue(null);
            RestaurantModel.findById = jest.fn().mockResolvedValue(null);
            const checkInBody = checkInBodyGenerator.generate()

            try {
                await service.checkIn(checkInBody, faker.internet.ip());
            } catch(error) {
                expect(error).toEqual(
                    new Error("Can not check in to a restaurant that does not exist")
                );
            }
            expect.assertions(1)
        });

        test("A checkin with a provided timeCheckedIn", async () => {
            const service = new CheckInService();
            const checkInBody = checkInBodyGenerator.generate();
            const checkIn = checkInGenerator.generate();
            CheckInModel.prototype.save = jest.fn().mockResolvedValue(checkIn);
            RestaurantModel.findById = jest.fn().mockResolvedValue(restaurantGenerator.generate());

            const checkInDocument = await service.checkIn(checkInBody, checkIn.ipAddress);

            expect(checkInDocument).toEqual(checkIn);
        })

        test("A successful check in", async () => {
            const service = new CheckInService();
            const checkIn = checkInGenerator.generate();
            const checkInBody = checkInBodyGenerator.generate();
            CheckInModel.prototype.save = jest.fn().mockResolvedValue(checkIn);
            RestaurantModel.findById = jest.fn().mockResolvedValue(restaurantGenerator.generate());

            const checkInDocument = await service.checkIn(checkInBody, checkIn.ipAddress);

            expect(checkInDocument).toEqual(checkIn);
        })
    });

    describe("getRestaurantReport", () => {
        test("A successful get check ins request with no entries", async () => {
            const service = new CheckInService();
            const checkIn = checkInGenerator.generate();
            CheckInModel.findByRestaurantId = jest.fn().mockResolvedValue([]);

            const report = await service.getRestaurantReport(checkIn._id);

            expect(report).toEqual("");
        })
        
        test("A successful get check ins request", async () => {
            const service = new CheckInService();
            const checkIn = checkInGenerator.generate();
            CheckInModel.findByRestaurantId = jest.fn().mockResolvedValue([ checkIn ]);

            const report = await service.getRestaurantReport(checkIn._id);

            expect(report).toEqual(CSV.JSONtoCSV([ checkIn.serialize() ]));
        })

        test("A successful get check ins request multiple rows", async () => {
            const service = new CheckInService();
            const checkIn = checkInGenerator.generate();
            const record = [ checkIn, checkIn, checkIn ];
            CheckInModel.findByRestaurantId = jest.fn().mockResolvedValue(record);

            const report = await service.getRestaurantReport(checkIn._id);

            expect(report).toEqual(CSV.JSONtoCSV(record.map((entry) => entry.serialize())));
        })
    })
});