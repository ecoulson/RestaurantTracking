const request = require("supertest");
const app = require("../../src/app");
const Restaurant = require("../../src/models/restaurant");
const TestRequests = require("./restaurant.data.json");
const ModelMock = require("../mocks/mongoose/ModelMock");

const REGISTER_URL = "/restaurant/register";
const CODE_URL = "/restaurant/code";
const RestaurantMock = new ModelMock(Restaurant);

afterEach(() => {
    jest.clearAllMocks();
});

describe("Restaurant Routes Suite", () => {
    describe("Registration Route", () => {
        test("A registration request with an empty body", async () => {
            const response = await makeRegisterRequest(TestRequests.empty);

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No name or number was provided");
        })

        test("A registration request without a name", async () => {
            const response = await makeRegisterRequest(TestRequests.register.noName)

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No name was provided");
        })

        test("A registration request without a number", async () => {
            const response = await makeRegisterRequest(TestRequests.register.noNumber)

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No number was provided");
        })

        test("A successful registration", async () => {
            RestaurantMock.methods.mockSave();
            const response = await makeRegisterRequest(TestRequests.register.ok);

            expectStatusCode(response, 200);
            expectJSONResponse(response, {
                success: true,
                data: {
                    message: "Successfully registered Bob's Burgers"
                }
            })
        })
    });

    describe("QRCode Route", () => {
        test("A qrcode request with no query", async () => {
            const response = await makeQRCodeRequest(TestRequests.empty);

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No restaurant was provided");
        })

        test("A successful qrcode generation", async () => {
            RestaurantMock.statics.mockFindById({
                _id: "1"
            });
            const response = await makeQRCodeRequest(TestRequests.code.ok);

            expectStatusCode(response, 200);
            expectHeader(response, "transfer-encoding", "chunked");
        })
    })
});

async function makeRegisterRequest(data) {
    return await makePostRequest(REGISTER_URL, data)
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

async function makeQRCodeRequest(query) {
    if (query.restaurant) {
        return await makeGetRequest(`${CODE_URL}?restaurant=${query.restaurant}`)
    }
    return await makeGetRequest(CODE_URL)
}

async function makeGetRequest(url) {
    return await request(app).get(url);
} 