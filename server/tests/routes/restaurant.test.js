const Restaurant = require("../../src/models/restaurant");
const TestRequests = require("./restaurant.data.json");
const ModelMock = require("../mocks/mongoose/ModelMock");
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

const REGISTER_URL = "/restaurant/register";
const CODE_URL = "/restaurant/:id/generate";
const RestaurantMock = new ModelMock(Restaurant);
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
            const response = await makeRegisterRequest(TestRequests.empty);

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No name or number was provided");
        })

        test("A registration request without a name", async () => {
            const response = await makeRegisterRequest(TestRequests.register.noName)

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No name was provided");
        })

        test("A registration request without a restaurantId", async () => {
            const response = await makeRegisterRequest(TestRequests.register.noNumber)

            expectStatusCode(response, 400);
            expectErrorResponse(response, "No number was provided");
        });

        test("Database error occurs", async () => {
            RestaurantMock.shouldThrow().methods.mockSave();;
    
            const response = await makeRegisterRequest(TestRequests.register.ok);
    
            expectStatusCode(response, 400);
            expectErrorResponse(response, "Database error");
        });

        test("A successful registration", async () => {
            RestaurantMock.methods.mockSave();
            
            const response = await makeRegisterRequest(TestRequests.register.ok);

            expectStatusCode(response, 200);
            expectSuccessResponse(response, {
                message: "Successfully registered Bob's Burgers"
            })
        })
    });

    describe("QRCode Route", () => {
        test("Database error occurs", async () => {
            RestaurantMock.shouldThrow().statics.mockFindById();;
    
            const response = await makeQRCodeRequest(TestRequests.code.ok);
    
            expectStatusCode(response, 400);
            expectErrorResponse(response, "Database error");
        });

        test("A successful qrcode generation", async () => {
            RestaurantMock.statics.mockFindById({
                _id: "1"
            });
            
            const response = await makeQRCodeRequest(TestRequests.code.ok);

            expectStatusCode(response, 200);
            expectHeader(response, "transfer-encoding", "chunked");
        })
    });

    describe("Get Restaurant", () => {
        test("Database error occurs", async () => {
            RestaurantMock.shouldThrow().statics.mockFindById();

            const response = await makeFindRestaurantRequest("1");

            expectStatusCode(response, 400);
            expectErrorResponse(response, "Database error");
        });

        test("Fails to find a restaurant", async () => {
            const response = await makeFindRestaurantRequest("1");

            expectStatusCode(response, 400);
            expectErrorResponse(response, "Could not find restaurant");
        });

        test("Successfully finds restaurant", async () => {
            RestaurantMock.statics.mockFindById({
                _id: "1",
                name: "Bob's Burgers",
                number: "4255035202"
            });

            const response = await makeFindRestaurantRequest("1");

            expectStatusCode(response, 200);
            expectSuccessResponse(response, {
                restaurant: {
                    name: "Bob's Burgers",
                    _id: "1",
                    number: "4255035202"
                }
            });
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