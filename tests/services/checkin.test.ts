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
    })
});

const mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};