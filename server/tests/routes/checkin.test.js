const request = require("supertest");
const app = require("../../src/app");
const CheckIn = require("../../src/models/check-in");
const TestRequests = require("./checkin.data.json");
const ModelMock = require("../mocks/mongoose/ModelMock");

const CHECKIN_URL = "/check_in";
const CheckInMock = new ModelMock(CheckIn);

describe("Check In Routes Suite", () => {
    describe("Create Check In Event Route", () => {
        test("A checkin request with an empty body", async () => {
            const response = await makeCheckInRequest(TestRequests.empty);

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No email, number, or restaurantId was provided");
        })

        test("A checkin request with a mising number field", async () => {
            const response = await makeCheckInRequest(TestRequests.post.noNumber);

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No number was provided");
        })

        test("A checkin request with a mising email field", async () => {
            const response = await makeCheckInRequest(TestRequests.post.noEmail);

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No email was provided");
        })

        test("A checkin request with a mising restaurantId field", async () => {
            const response = await makeCheckInRequest(TestRequests.post.noRestaurantId);

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No restaurantId was provided");
        });

        test("A checkin request with a only a number field", async () => {
            const response = await makeCheckInRequest(TestRequests.post.onlyNumber);

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No email or restaurantId was provided");
        })

        test("A checkin request with a only an email field", async () => {
            const response = await makeCheckInRequest(TestRequests.post.onlyEmail);

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No number or restaurantId was provided");
        })

        test("A checkin request with a only a restaurantId field", async () => {
            const response = await makeCheckInRequest(TestRequests.post.onlyRestaurant);

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No email or number was provided");
        })

        test("Database error occurs", async () => {
            CheckInMock.shouldThrow().methods.mockSave();
    
            const response = await makeCheckInRequest(TestRequests.post.ok);
    
            expectStatusCode(response, 400);
            expectErrorResponse(response, "Database error");
        });

        test("A successful registration", async () => {
            CheckInMock.methods.mockSave();
            const response = await makeCheckInRequest(TestRequests.post.ok);

            expectStatusCode(response, 200);
            expectSuccessResponse(response, {
                message: "Successfully checked in"
            });
        })
    });

    describe("Gets all check-ins at a specific restaurant", () => {
        test("A get check ins request with no query", async () => {
            const response = await getCheckinsAtRestaurantRequest(TestRequests.empty);

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No restaurantId was provided");
        });

        test("A get check ins request with duplicate query parameters", async () => {
            const response = await getDuplicateCheckinsAtRestaurantRequest(TestRequests.get.ok);

            expectStatusCode(response, 400);
            expectErrorResponse(response, "Duplicate restaurantId was provided");
        })

        test("Database error occurs", async () => {
            CheckInMock.shouldThrow().statics.mockFind([]);
    
            const response = await getCheckinsAtRestaurantRequest(TestRequests.get.ok);
    
            expectStatusCode(response, 400);
            expectErrorResponse(response, "Database error");
        });

        test("A successful get check ins request", async () => {
            CheckInMock.statics.mockFind([])
            const response = await getCheckinsAtRestaurantRequest(TestRequests.get.ok);

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

async function makePostRequest(url, data) {
    return await request(app).post(url).send(data);
}

function expectStatusCode(response, status) {
    expect(response.status).toBe(status);
}

function expectErrorResponse(response, message) {
    expectJSONResponse(response, {
        success: false,
        data: {
            error: message
        }
    })
}

function expectJSONResponse(response, body) {
    expectContentType(response, "application/json; charset=utf-8");
    expect(response.body).toEqual(body);
}

function expectContentType(response, contentType) {
    expectHeader(response, "content-type", contentType);
}

function expectHeader(response, header, value) {
    expect(response.header[header]).toBe(value);
}

function expectSuccessResponse(response, data) {
    expectJSONResponse(response, {
        success: true,
        data: data
    })
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

async function makeGetRequest(url) {
    return await request(app).get(url);
} 