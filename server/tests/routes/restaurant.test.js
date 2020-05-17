const request = require("supertest");
const app = require("../../src/app");

const REGISTER_URL = "/restaurant/register";
const CODE_URL = "/restaurant/code";

describe("Restaurant Routes Suite", () => {
    describe("Registration Route", () => {
        test("A registration request with an empty body", async () => {
            const response = await makeRegisterRequest();

            expectStatusCode(response, 400);
            expectJSONResponse(response, {
                success: false,
                data: {
                    error: "No name or number was provided"
                }
            });
        })

        test("A registration request without a name", async () => {
            const response = await makeRegisterRequest({
                number: "4255035202"
            })

            expectStatusCode(response, 400);
            expectJSONResponse(response, {
                success: false,
                data: {
                    error: "No name was provided"
                }
            })
        })

        test("A registration request without a number", async () => {
            const response = await makeRegisterRequest({
                name: "Bob's Burgers"
            });

            expectStatusCode(response, 400);
            expectJSONResponse(response, {
                success: false,
                data: {
                    error: "No number was provided"
                }
            })
        })

        test("A successful registration", async () => {
            const response = await makeRegisterRequest({
                number: "4255035202",
                name: "Bob's Burgers"
            });

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
            const response = await makeQRCodeRequest();

            expectStatusCode(response, 400);
            expectJSONResponse(response, {
                success: false,
                data: {
                    error: "No restaurant was provided"
                }
            })
        })

        test("A successful qrcode generation", async () => {
            const response = await makeQRCodeRequest(1);

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

async function makeQRCodeRequest(restaurant) {
    if (restaurant) {
        return await makeGetRequest(`${CODE_URL}?restaurant=${restaurant}`)
    }
    return await makeGetRequest(CODE_URL)
}

async function makeGetRequest(url) {
    return await request(app).get(url);
} 