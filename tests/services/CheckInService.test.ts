import { createModelMock } from "../mocks/models";
createModelMock("../../src/models/check-in/CheckInModel");
createModelMock("../../src/models/restaurant/RestaurantModel");
import RestaurantModel from "../../src/models/restaurant/RestaurantModel";
import CheckInService from "../../src/services/CheckInService";
import CheckInModel from "../../src/models/check-in/CheckInModel";
const faker = require("faker");
const Chance = require('chance');

const chance = new Chance();

describe("Checkin Service Test", () => {
    describe("checkIn", () => {
        test("A successful check in", async () => {
            const service = new CheckInService();
            CheckInModel.prototype.save.mockResolvedValue({});
            (RestaurantModel.findById as any).mockResolvedValue({});

            const result : boolean = await service.checkIn({
                number: chance.phone({ country: 'us' }),
                email: faker.internet.email(),
                restaurantId: mongoObjectId()
            }, "1.1.1.1");

            expect(result).toBeTruthy();
        })
    });

    describe("findCheckinsByRestaurant", () => {
        test("A successful get check ins request", async () => {
            const service = new CheckInService();
            const id = mongoObjectId();
            const ip = faker.internet.ip();
            const number = chance.phone({ country: 'us' });
            const email = faker.internet.email();
            const timeCheckedIn = new Date().toUTCString();
            (CheckInModel.findByRestaurantId as jest.Mock).mockResolvedValue([
                {
                    serialize: () => {
                        return {
                            __v: 0,
                            _id: id,
                            restaurantId: id,
                            timeCheckedIn: timeCheckedIn,
                            email: email,
                            number: number,
                            ipAddress: ip
                        }
                    }
                }
            ]);

            const report = await service.findCheckinsByRestaurant(id);

            expect(report).toEqual(`"__v","_id","email","ipAddress","number","restaurantId","timeCheckedIn"\n"0","${id}","${email}","${ip}","${number}","${id}","${timeCheckedIn}"`);
        })
    })
});

const mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};