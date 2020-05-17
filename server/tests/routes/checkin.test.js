const request = require("supertest");
const app = require("../../src/app");
const CheckIn = require("../../src/models/check-in");
const TestRequests = require("./checkin.data.json");
const ModelMock = require("../mocks/mongoose/ModelMock");

const CHECKIN_URL = "/check_in/";
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

        test("A successful registration", async () => {
            CheckInMock.methods.mockSave();
            const response = await makeCheckInRequest(TestRequests.post.ok);

            expectStatusCode(response, 200);
            expectJSONResponse(response, {
                success: true,
                data: {
                    message: "Successfully checked in"
                }
            })
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

async function makeGetRequest(url) {
    return await request(app).get(url);
} 