jest.mock("../../src/models/check-in");
const CheckIn = require("../../src/models/check-in");
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

const CHECKIN_URL = "/check_in";

describe("Check In Routes Suite", () => {
    describe("Create Check In Event Route", () => {
        test("A checkin request with an empty body", async () => {
            const response = await makeCheckInRequest({});

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No restaurantId was provided");
        })

        test("A checkin request with a mising restaurantId field", async () => {
            const response = await makeCheckInRequest({
                email: faker.internet.email(),
                number: faker.phone.phoneNumber(),
            });

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No restaurantId was provided");
        });

        test("A checkin request with a only a number field", async () => {
            const response = await makeCheckInRequest({
                number: faker.phone.phoneNumber(),
            });

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No restaurantId was provided");
        })

        test("A checkin request with a only an email field", async () => {
            const response = await makeCheckInRequest({
                email: faker.internet.email()
            });

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No restaurantId was provided");
        })

        test("A checkin request with a only a restaurantId field", async () => {
            const response = await makeCheckInRequest({
                restaurantId: mongoObjectId()
            });

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No email or number was provided");
        })

        test("Database error occurs", async () => {
            CheckIn.prototype.save.mockRejectedValue(new Error("Database error"));
    
            const response = await makeCheckInRequest({
                number: faker.phone.phoneNumber(),
                email: faker.internet.email(),
                restaurantId: mongoObjectId()
            });
    
            expectStatusCode(response, 400);
            expectErrorResponse(response, "Database error");
        });

        test("A successful registration", async () => {
            CheckIn.prototype.save.mockResolvedValue({});
            const response = await makeCheckInRequest({
                number: faker.phone.phoneNumber(),
                email: faker.internet.email(),
                restaurantId: mongoObjectId()
            });

            expectStatusCode(response, 200);
            expectSuccessResponse(response, {
                message: "Successfully checked in"
            });
        })
    });

    describe("Gets all check-ins at a specific restaurant", () => {
        test("A get check ins request with no query", async () => {
            const response = await getCheckinsAtRestaurantRequest({});

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No restaurantId was provided");
        });

        test("A get check ins request with duplicate query parameters", async () => {
            const response = await getDuplicateCheckinsAtRestaurantRequest({
                restaurantId: mongoObjectId()
            });

            expectStatusCode(response, 400);
            expectErrorResponse(response, "Duplicate restaurantId was provided");
        })

        test("Database error occurs", async () => {
            CheckIn.findByRestaurantId.mockRejectedValue(new Error("Database error"));
    
            const response = await getCheckinsAtRestaurantRequest({
                restaurantId: mongoObjectId()
            });
    
            expectStatusCode(response, 400);
            expectErrorResponse(response, "Database error");
        });

        test("A successful get check ins request", async () => {
            CheckIn.findByRestaurantId.mockResolvedValue([]);

            const response = await getCheckinsAtRestaurantRequest({
                restaurantId: mongoObjectId()
            });

            expectStatusCode(response, 200);
            expectSuccessResponse(response, {
                checkIns: []
            });
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

const mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};