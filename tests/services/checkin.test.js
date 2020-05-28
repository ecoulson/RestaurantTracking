require("../mocks/models")("../../src/models/check-in");
require("../mocks/models")("../../src/models/restaurant");
const CheckIn = require("../../src/models/check-in");
const Restaurant = require("../../src/models/restaurant");
const CheckInService = require("../../src/services/check-in");
const { mockRequest, mockResponse } = require("mock-req-res");
const faker = require("faker");
const Chance = require('chance');

const chance = new Chance();

describe("Checkin Service Test", () => {
    describe("checkIn", () => {
        test("A successful check in", async () => {
            CheckIn.prototype.save.mockResolvedValue({});
            Restaurant.findById.mockResolvedValue(null);
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