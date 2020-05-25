jest.mock("../../src/models/restaurant");
const Restaurant = require("../../src/models/restaurant");
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
            expectErrorResponse(response, "No name or number was provided");
        })

        test("A registration request without a name", async () => {
            const response = await makeRegisterRequest({
                number: faker.phone.phoneNumber()
            })

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No name was provided");
        })

        test("A registration request without a restaurantId", async () => {
            const response = await makeRegisterRequest({
                name: faker.company.companyName()
            })

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No number was provided");
        });

        test("Database error occurs", async () => {
            Restaurant.prototype.save.mockRejectedValue(new Error("Database error"));
    
            const response = await makeRegisterRequest({
                number: faker.phone.phoneNumber(),
                name: faker.company.companyName()
            });
    
            expectStatusCode(response, 400);
            expectErrorResponse(response, "Database error");
        });

        test("A successful registration", async () => {
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
                restaurantId: faker.random.uuid()
            });
    
            expectStatusCode(response, 400);
            expectErrorResponse(response, "Database error");
        });

        test("A successful qrcode generation", async () => {
            const restaurant = {
                _id: faker.random.uuid()
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

            const response = await makeFindRestaurantRequest(faker.random.uuid());

            expectStatusCode(response, 400);
            expectErrorResponse(response, "Database error");
        });

        test("Fails to find a restaurant", async () => {
            Restaurant.findById.mockResolvedValue(null);

            const response = await makeFindRestaurantRequest(faker.random.uuid());

            expectStatusCode(response, 400);
            expectErrorResponse(response, "Could not find restaurant");
        });

        test("Successfully finds restaurant", async () => {
            const restaurant = {
                _id: faker.random.uuid(),
                name: faker.company.companyName(),
                number: faker.phone.phoneNumber()
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
    return await makeGetRequest(CODE_URL.replace(":id", "1"))
}

async function makeFindRestaurantRequest(id) {
    return await makeGetRequest(`/restaurant/${id}`);
}