import { createModelMock } from "../mocks/models";
createModelMock("../../src/models/check-in");
createModelMock("../../src/models/restaurant");
import CheckIn from "../../src/models/check-in";
import Restaurant from "../../src/models/restaurant";
import * as CheckInService from "../../src/services/check-in";
import { mockRequest, mockResponse } from "mock-req-res";
const faker = require("faker");
const Chance = require('chance');

const chance = new Chance();

describe("Checkin Service Test", () => {
    describe("checkIn", () => {
        test("A successful check in", async () => {
            CheckIn.prototype.save.mockResolvedValue({});
            (Restaurant.findById as any).mockResolvedValue(null);
            const request = mockRequest({
                body: {
                    number: chance.phone({ country: 'us' }),
                    email: faker.internet.email(),
                    restaurantId: mongoObjectId()
                }
            })
            const response = mockResponse();

            await CheckInService.checkIn(request, response);

            expect(response.status).toHaveBeenCalledWith(400);
        })
    });

    describe("findCheckinsByRestaurant", () => {
        test("A successful get check ins request", async () => {
            const id = mongoObjectId();
            const ip = faker.internet.ip();
            const number = chance.phone({ country: 'us' });
            const email = faker.internet.email();
            const timeCheckedIn = new Date().toUTCString();
            ((CheckIn as any).findByRestaurantId as any).mockResolvedValue([
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
            const request = mockRequest({
                query: {
                    restaurantId: id
                }
            });
            const response = mockResponse();

            await CheckInService.findCheckinsByRestaurant(request, response);

            expect(response.status).toBeCalledWith(200);
            expect(response.send).toBeCalledWith(`"__v","_id","email","ipAddress","number","restaurantId","timeCheckedIn"\n"0","${id}","${email}","${ip}","${number}","${id}","${timeCheckedIn}"`);
        })
    })
});

const mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};