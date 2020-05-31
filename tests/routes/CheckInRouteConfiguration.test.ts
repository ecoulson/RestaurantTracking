import { createModelMock } from "../mocks/models";
createModelMock("../../src/models/check-in/CheckInModel");
createModelMock("../../src/models/restaurant/RestaurantModel");
import RestaurantModel from "../../src/models/restaurant/RestaurantModel";
import faker from "faker";
import { 
    expectErrorResponse, 
    expectStatusCode, 
    expectSuccessResponse
} from "../helpers/expect";
import {
    makeGetRequest,
    makePostRequest
} from "../helpers/request";
import Chance from 'chance';
import { generateObjectId } from "../helpers/mongo";
import CheckInModel from "../../src/models/check-in/CheckInModel";

const chance = new Chance();

const CHECKIN_URL = "/check_in";

const OLD_ENV = process.env;

beforeAll(() => {
    process.env.SERVER_SECRET = "token"
});

afterEach(() => {
    jest.clearAllMocks();
    process.env = OLD_ENV;
});

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
            CheckInModel.prototype.save.mockRejectedValue(new Error());
            (RestaurantModel.findById as jest.Mock).mockResolvedValue({});
            const id = generateObjectId();

            const response = await makeCheckInRequest({
                number: chance.phone({ country: 'us' }),
                email: faker.internet.email(),
                restaurantId: id
            });
    
            expectErrorResponse(
                response, 
                `Error when saving checkin to restaurant with ${id} from ::ffff:127.0.0.1`
            );
            expectStatusCode(response, 400);
        });

        test("A successful check in", async () => {
            CheckInModel.prototype.save.mockResolvedValue({});
            (RestaurantModel.findById as jest.Mock).mockResolvedValue({});
            
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

            expectErrorResponse(response, [
                "\"restaurantId\" must be a string",
            ]);
            expectStatusCode(response, 400);
        })

        test("Database error occurs", async () => {
            (CheckInModel.findByRestaurantId as jest.Mock).mockRejectedValue(
                new Error("Database error")
            );
    
            const response = await getCheckinsAtRestaurantRequest({
                restaurantId: generateObjectId()
            });
    
            expectErrorResponse(response, "Database error");
            expectStatusCode(response, 400);
        });
    });
});

async function makeCheckInRequest(body : any) {
    return await makePostRequest(CHECKIN_URL, body);
}

async function getCheckinsAtRestaurantRequest(query : any) {
    if (query && query.restaurantId) {
        return await makeGetRequest(`${CHECKIN_URL}?restaurantId=${query.restaurantId}`)
    }
    return await makeGetRequest(CHECKIN_URL)
}

async function getDuplicateCheckinsAtRestaurantRequest(query : any) {
    return await makeGetRequest(
        `${CHECKIN_URL}?restaurantId=${query.restaurantId}&restaurantId=${query.restaurantId}`
    );
}