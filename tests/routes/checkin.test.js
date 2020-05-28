require("../mocks/models")("../../src/models/check-in");
require("../mocks/models")("../../src/models/restaurant");
const CheckIn = require("../../src/models/check-in");
const Restaurant = require("../../src/models/restaurant");
const faker = require("faker");
const { 
    expectErrorResponse, 
    expectStatusCode, 
    expectSuccessResponse
} = require("../helpers/expect");
const {
    makeGetRequest,
    makePostRequest
} = require("../helpers/request");
const Chance = require('chance');
const { generateObjectId } = require("../helpers/mongo");

const chance = new Chance();

const CHECKIN_URL = "/check_in";

beforeEach(() => {
    jest.resetAllMocks()
})

describe("Check In Routes Suite", () => {
    describe("Create Check In Event Route", () => {
        test("A checkin request with an empty body", async () => {
            const response = await makeCheckInRequest({});

            expectErrorResponse(response, [
                "No email or number was provided"
            ]);
            expectStatusCode(response, 400);
        })

        test("A checkin request with a mising restaurantId field", async () => {
            const response = await makeCheckInRequest({
                email: faker.internet.email(),
                number: chance.phone({ country: 'us' }),
            });

            expectErrorResponse(response, [
                "\"restaurantId\" is required"
            ]);
            expectStatusCode(response, 400);
        });

        test("A checkin request with a only a number field", async () => {
            const response = await makeCheckInRequest({
                number: chance.phone({ country: 'us' }),
            });

            expectErrorResponse(response, [
                "\"restaurantId\" is required"
            ]);
            expectStatusCode(response, 400);
        })

        test("A checkin request with a only an email field", async () => {
            const response = await makeCheckInRequest({
                email: faker.internet.email()
            });

            expectErrorResponse(response, [
                "\"restaurantId\" is required"
            ]);
            expectStatusCode(response, 400);
        })

        test("A checkin request with a only a restaurantId field", async () => {
            const response = await makeCheckInRequest({
                restaurantId: generateObjectId()
            });

            expectErrorResponse(response, [
                "No email or number was provided"
            ]);
            expectStatusCode(response, 400);
        })

        test("Database error occurs", async () => {
            CheckIn.prototype.save.mockRejectedValue(new Error("Database error"));
            Restaurant.findById.mockResolvedValue({});
    
            const response = await makeCheckInRequest({
                number: chance.phone({ country: 'us' }),
                email: faker.internet.email(),
                restaurantId: generateObjectId()
            });
    
            expectErrorResponse(response, "Database error");
            expectStatusCode(response, 400);
        });

        test("A successful check in", async () => {
            CheckIn.prototype.save.mockResolvedValue({});
            Restaurant.findById.mockResolvedValue({});
            
            const response = await makeCheckInRequest({
                number: chance.phone({ country: 'us' }),
                email: faker.internet.email(),
                restaurantId: generateObjectId()
            });

            expectSuccessResponse(response, {
                message: "Successfully checked in"
            });
            expectStatusCode(response, 200);
        })
    });

    describe("Gets all check-ins at a specific restaurant", () => {
        test("A get check ins request with no query", async () => {
            const response = await getCheckinsAtRestaurantRequest({});

            expectErrorResponse(response, [
                "\"restaurantId\" is required",
            ]);
            expectStatusCode(response, 400);
        });

        test("A get check ins request with duplicate query parameters", async () => {
            const response = await getDuplicateCheckinsAtRestaurantRequest({
                restaurantId: generateObjectId()
            });

            expectErrorResponse(response, "Duplicate restaurantId was provided");
            expectStatusCode(response, 400);
        })

        test("Database error occurs", async () => {
            CheckIn.findByRestaurantId.mockRejectedValue(new Error("Database error"));
    
            const response = await getCheckinsAtRestaurantRequest({
                restaurantId: generateObjectId()
            });
    
            expectErrorResponse(response, "Database error");
            expectStatusCode(response, 400);
        });

        test("A successful get check ins request", async () => {
            CheckIn.findByRestaurantId.mockResolvedValue([]);

            const response = await getCheckinsAtRestaurantRequest({
                restaurantId: generateObjectId()
            });

            expectSuccessResponse(response, {
                checkIns: []
            });
            expectStatusCode(response, 200);
        })
    });
});

async function makeCheckInRequest(body) {
    return await makePostRequest(CHECKIN_URL, body);
}

async function getCheckinsAtRestaurantRequest(query) {
    if (query && query.restaurantId) {
        return await makeGetRequest(`${CHECKIN_URL}?restaurantId=${query.restaurantId}`)
    }
    return await makeGetRequest(CHECKIN_URL)
}

async function getDuplicateCheckinsAtRestaurantRequest(query) {
    return await makeGetRequest(`${CHECKIN_URL}?restaurantId=${query.restaurantId}&restaurantId=${query.restaurantId}`)
}