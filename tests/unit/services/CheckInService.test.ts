import { createModelMock } from "../../mocks/models";
createModelMock("../../../src/models/check-in/CheckInModel");
createModelMock("../../../src/models/restaurant/RestaurantModel");
import RestaurantModel from "../../../src/models/restaurant/RestaurantModel";
import CheckInService from "../../../src/services/CheckInService";
import CheckInModel from "../../../src/models/check-in/CheckInModel";
import faker from "faker";
import Chance from "chance";
import { generateObjectId } from "../../helpers/mongo";
import CSV from "../../../src/lib/HTTP/CSV";

const chance = new Chance();

describe("Checkin Service Test", () => {
    describe("checkIn", () => {
        test("A an error when saving for restaurant with an id", async () => {
            const service = new CheckInService();
            CheckInModel.prototype.save.mockRejectedValue(new Error());
            (RestaurantModel.findById as jest.Mock).mockResolvedValue({});
            const id = generateObjectId();
            const ip = faker.internet.ip()
            try {
                await service.checkIn({
                    number: chance.phone({ country: 'us' }),
                    email: faker.internet.email(),
                    restaurantId: id
                }, ip);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Error when saving checkin to restaurant with ${id} from ${ip}`
                ));
            }
            expect.assertions(1);
        });

        test("A an error when finding restaurant during checkin", async () => {
            const service = new CheckInService();
            CheckInModel.prototype.save.mockResolvedValue(null);
            (RestaurantModel.findById as jest.Mock).mockRejectedValue(new Error());
            const id = generateObjectId();
            try {
                await service.checkIn({
                    number: chance.phone({ country: 'us' }),
                    email: faker.internet.email(),
                    restaurantId: id
                }, faker.internet.ip());
            } catch (error) {
                expect(error).toEqual(new Error(`Error when finding restaurant with ${id}`));
            }
            expect.assertions(1);
        });

        test("A checkin to a restaurant that does not exist", async () => {
            const service = new CheckInService();
            CheckInModel.prototype.save.mockResolvedValue(null);
            (RestaurantModel.findById as jest.Mock).mockResolvedValue(null);

            try {
                await service.checkIn({
                    number: chance.phone({ country: 'us' }),
                    email: faker.internet.email(),
                    restaurantId: generateObjectId()
                }, "1.1.1.1");
            } catch(error) {
                expect(error).toEqual(
                    new Error("Can not check in to a restaurant that does not exist")
                );
            }
            expect.assertions(1)
        });

        test("A checkin with a provided timeCheckedIn", async () => {
            const service = new CheckInService();
            const checkIn = {
                number: chance.phone({ country: 'us' }),
                email: faker.internet.email(),
                restaurantId: generateObjectId(),
                ipAddress: faker.internet.ip(),
                timeCheckedIn: faker.date.recent()
            }
            CheckInModel.prototype.save.mockResolvedValue(checkIn);
            (RestaurantModel.findById as jest.Mock).mockResolvedValue({});

            const checkInDocument = await service.checkIn(checkIn, checkIn.ipAddress);

            expect(checkInDocument).toEqual(checkIn);
        })

        test("A successful check in", async () => {
            const service = new CheckInService();
            const checkIn = {
                number: chance.phone({ country: 'us' }),
                email: faker.internet.email(),
                restaurantId: generateObjectId(),
                ipAddress: faker.internet.ip()
            }
            CheckInModel.prototype.save.mockResolvedValue(checkIn);
            (RestaurantModel.findById as jest.Mock).mockResolvedValue({});

            const checkInDocument = await service.checkIn(checkIn, checkIn.ipAddress);

            expect(checkInDocument).toEqual(checkIn);
        })
    });

    describe("getRestaurantReport", () => {
        test("A successful get check ins request with no entries", async () => {
            const service = new CheckInService();
            const checkIn = getCheckin();
            (CheckInModel.findByRestaurantId as jest.Mock).mockResolvedValue([]);

            const report = await service.getRestaurantReport(checkIn.id);

            expect(report).toEqual("");
        })
        
        test("A successful get check ins request", async () => {
            const service = new CheckInService();
            const checkIn = getCheckin();
            (CheckInModel.findByRestaurantId as jest.Mock).mockResolvedValue([
                getCheckinDocument(checkIn)
            ]);

            const report = await service.getRestaurantReport(checkIn.id);

            expect(report).toEqual(CSV.JSONtoCSV([
                getCheckinDocument(checkIn).serialize()
            ]));
        })

        test("A successful get check ins request multiple rows", async () => {
            const service = new CheckInService();
            const checkIn = getCheckin();
            const record = [
                getCheckinDocument(checkIn),
                getCheckinDocument(checkIn),
                getCheckinDocument(checkIn),
                getCheckinDocument(checkIn)
            ];
            (CheckInModel.findByRestaurantId as jest.Mock).mockResolvedValue(record);

            const report = await service.getRestaurantReport(checkIn.id);

            expect(report).toEqual(CSV.JSONtoCSV(record.map((entry : any) => entry.serialize())));
        })
    })
});

function getCheckin() {
    return {
        id : generateObjectId(),
        ip : faker.internet.ip(),
        number : chance.phone({ country: 'us' }),
        email : faker.internet.email(),
        timeCheckedIn : new Date().toUTCString(),
    }
}

function getCheckinDocument(checkIn : any) {
    return {
        serialize: () => {
            return {
                __v: 0,
                _id: checkIn.id,
                restaurantId: checkIn.id,
                timeCheckedIn: checkIn.timeCheckedIn,
                email: checkIn.email,
                number: checkIn.number,
                ipAddress: checkIn.ip
            }
        }
    }
}