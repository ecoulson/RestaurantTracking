import { createModelMock } from "../mocks/models";
createModelMock("../../src/models/restaurant");
jest.mock("../../src/lib/URL-Shortener");
import Restaurant from "../../src/models/restaurant";
import URLShortener from "../../src/lib/URL-shortener";
import { 
    expectErrorResponse, 
    expectStatusCode, 
    expectSuccessResponse,
    expectHeader
} from "../helpers/expect";
import {
    makeGetRequest,
    makePostRequest
} from "../helpers/request";
import faker from "faker";
import Chance from "chance";
import { generateObjectId } from "../helpers/mongo";

const chance = new Chance();

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

            expectErrorResponse(response, [
                "\"name\" is required"
            ]);
            expectStatusCode(response, 400);
        })

        test("A registration request without a name", async () => {
            const response = await makeRegisterRequest({
                number: chance.phone()
            })

            expectErrorResponse(response, [
                "\"name\" is required"
            ]);
            expectStatusCode(response, 400);
        })

        test("A registration request without a restaurantId", async () => {
            const response = await makeRegisterRequest({
                name: faker.company.companyName()
            })

            expectErrorResponse(response, [
                "\"number\" is required"
            ]);
            expectStatusCode(response, 400);
        });

        test("Database error occurs", async () => {
            const url = faker.internet.url();
            (URLShortener as any).mockResolvedValue({
                data: {
                    link: url
                }
            })
            Restaurant.prototype.save.mockRejectedValue(new Error("Database error"));
    
            const response = await makeRegisterRequest({
                number: chance.phone(),
                name: faker.company.companyName()
            });
            
            expectErrorResponse(response, "Database error");
            expectStatusCode(response, 400);
        });

        test("A successful registration", async () => {
            const url = faker.internet.url();
            (URLShortener as any).mockResolvedValue({
                data: {
                    link: url
                }
            })
            Restaurant.prototype.save.mockResolvedValue({});
            
            const request = {
                number: chance.phone(),
                name: faker.company.companyName()
            }

            const response = await makeRegisterRequest(request);

            expectSuccessResponse(response, {
                message: `Successfully registered ${request.name}`
            })
            expectStatusCode(response, 200);
        })
    });

    describe("QRCode Generation Route", () => {
        test("Database error occurs", async () => {
            (Restaurant.findById as any).mockRejectedValue(new Error("Database error"));
            const id = generateObjectId();

            const response = await makeQRCodeRequest({
                restaurantId: id
            });
    
            expectErrorResponse(response, `Failed to find a restaurant with id ${id}`);
            expectStatusCode(response, 400);
        });

        test("A successful qrcode generation", async () => {
            const restaurant = {
                _id: generateObjectId(),
                url: faker.internet.url()
            };
            (Restaurant.findById as any).mockResolvedValue(restaurant);
            
            const response = await makeQRCodeRequest({
                restaurantId: restaurant._id
            });

            expectHeader(response, "transfer-encoding", "chunked");
            expectStatusCode(response, 200);
        })
    });

    describe("Get Restaurant", () => {
        test("Database error occurs", async () => {
            (Restaurant.findById as any).mockRejectedValue(new Error("Database error"));

            const response = await makeFindRestaurantRequest(generateObjectId());

            expectErrorResponse(response, "Could not find restaurant");
            expectStatusCode(response, 400);
        });

        test("Fails to find a restaurant", async () => {
            (Restaurant.findById as any).mockResolvedValue(null);

            const response = await makeFindRestaurantRequest(generateObjectId());

            expectErrorResponse(response, "Could not find restaurant");
            expectStatusCode(response, 400);
        });

        test("Successfully finds restaurant", async () => {
            const restaurant = {
                _id: generateObjectId(),
                name: faker.company.companyName(),
                number: chance.phone(),
                url: faker.internet.url()
            };
            (Restaurant.findById as any).mockResolvedValue(restaurant);

            const response = await makeFindRestaurantRequest(restaurant._id);

            expectSuccessResponse(response, { restaurant });
            expectStatusCode(response, 200);
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

async function makeFindRestaurantRequest(id) {
    return await makeGetRequest(`/restaurant/${id}`);
}