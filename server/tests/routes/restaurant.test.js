require("../mocks/models")("../../src/models/restaurant");
jest.mock("../../src/lib/URL-Shortener");
const Restaurant = require("../../src/models/restaurant");
const URLShortener = require("../../src/lib/URL-shortener");
const { 
    expectErrorResponse, 
    expectStatusCode, 
    expectSuccessResponse,
    expectHeader
} = require("../helpers/expect");
const {
    makeGetRequest,
    makePostRequest
} = require("../helpers/request");
const faker = require("faker");

const REGISTER_URL = "/restaurant/register";
const CODE_URL = "/restaurant/:id/generate";
const OLD_ENV = process.env;

beforeAll(() => {
    process.env.SERVER_SECRET = "token"
});

afterEach(() => {
    jest.clearAllMocks();
    process.env = OLD_ENV;
});

describe("Restaurant Routes Suite", () => {
    describe("Registration Route", () => {
        test("A registration request with an empty body", async () => {
            const response = await makeRegisterRequest({});

            expectStatusCode(response, 400);
            expectErrorResponse(response, [
                "\"name\" is required"
            ]);
        })

        test("A registration request without a name", async () => {
            const response = await makeRegisterRequest({
                number: faker.phone.phoneNumber()
            })

            expectStatusCode(response, 400);
            expectErrorResponse(response, [
                "\"name\" is required"
            ]);
        })

        test("A registration request without a restaurantId", async () => {
            const response = await makeRegisterRequest({
                name: faker.company.companyName()
            })

            expectStatusCode(response, 400);
            expectErrorResponse(response, [
                "\"number\" is required"
            ]);
        });

        test("Database error occurs", async () => {
            const url = faker.internet.url();
            URLShortener.mockResolvedValue({
                data: {
                    link: url
                }
            })
            Restaurant.prototype.save.mockRejectedValue(new Error("Database error"));
    
            const response = await makeRegisterRequest({
                number: faker.phone.phoneNumber(),
                name: faker.company.companyName()
            });
            
            expectStatusCode(response, 400);
            expectErrorResponse(response, "Database error");
        });

        test("A successful registration", async () => {
            const url = faker.internet.url();
            URLShortener.mockResolvedValue({
                data: {
                    link: url
                }
            })
            Restaurant.prototype.save.mockResolvedValue({})
            const request = {
                number: faker.phone.phoneNumber(),
                name: faker.company.companyName()
            }

            const response = await makeRegisterRequest(request);

            expectStatusCode(response, 200);
            expectSuccessResponse(response, {
                message: `Successfully registered ${request.name}`
            })
        })
    });

    describe("QRCode Route", () => {
        test("Database error occurs", async () => {
            Restaurant.findById.mockRejectedValue(new Error("Database error"));
    
            const response = await makeQRCodeRequest({
                restaurantId: mongoObjectId()
            });
    
            expectStatusCode(response, 400);
            expectErrorResponse(response, "Database error");
        });

        test("A successful qrcode generation", async () => {
            const restaurant = {
                _id: mongoObjectId(),
                url: faker.internet.url()
            }
            Restaurant.findById.mockResolvedValue(restaurant);
            
            const response = await makeQRCodeRequest({
                restaurantId: restaurant._id
            });

            expectStatusCode(response, 200);
            expectHeader(response, "transfer-encoding", "chunked");
        })
    });

    describe("Get Restaurant", () => {
        test("Database error occurs", async () => {
            Restaurant.findById.mockRejectedValue(new Error("Database error"));

            const response = await makeFindRestaurantRequest(mongoObjectId());

            expectStatusCode(response, 400);
            expectErrorResponse(response, "Database error");
        });

        test("Fails to find a restaurant", async () => {
            Restaurant.findById.mockResolvedValue(null);

            const response = await makeFindRestaurantRequest(mongoObjectId());

            expectStatusCode(response, 400);
            expectErrorResponse(response, "Could not find restaurant");
        });

        test("Successfully finds restaurant", async () => {
            const restaurant = {
                _id: mongoObjectId(),
                name: faker.company.companyName(),
                number: faker.phone.phoneNumber(),
                url: faker.internet.url()
            }
            Restaurant.findById.mockResolvedValue(restaurant);

            const response = await makeFindRestaurantRequest(restaurant._id);

            expectStatusCode(response, 200);
            expectSuccessResponse(response, { restaurant });
        })
    })
});

async function makeRegisterRequest(data) {
    return await makePostRequest(REGISTER_URL, data)
}

async function makeQRCodeRequest(params) {
    if (params.restaurantId) {
        return await makeGetRequest(CODE_URL.replace(":id", params.restaurantId))
    }
    return await makeGetRequest(CODE_URL.replace(":id", "null"))
}

const mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};

async function makeFindRestaurantRequest(id) {
    return await makeGetRequest(`/restaurant/${id}`);
}