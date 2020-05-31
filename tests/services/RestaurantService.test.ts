jest.mock("../../src/lib/URL-shortener");
import RestaurantModel from "../../src/models/restaurant/RestaurantModel";
import RestaurantService from "../../src/services/RestaurantService";
import { generateObjectId } from "../helpers/mongo";
import faker from "faker";
import Chance from "chance";

const chance = new Chance();

describe("Restaurant Service Test", () => {
    describe("generateQRCode", () => {
        test("Error when finding a restaurant", async () => {
            const service = new RestaurantService();
            RestaurantModel.findById = jest.fn().mockRejectedValue(new Error());
            const id = generateObjectId();
            
            try {
                await service.generateQRCode(id)
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to find a restaurant with id ${id}`))
            }
        });

        test("Gets the restaurant to generate the QR Code for", async () => {
            const service = new RestaurantService();
            const restaurant = {
                name: faker.company.companyName(),
                number: chance.phone({ country: "us" })
            }
            RestaurantModel.findById = jest.fn().mockResolvedValue(restaurant);

            const restaurantDocument = await service.generateQRCode(generateObjectId());

            expect(restaurantDocument.name).toEqual(restaurant.name);
            expect(restaurantDocument.number).toEqual(restaurant.number);
        })

        test("Generate a QR Code for a restaurant that doesn't exist", async () => {
            const service = new RestaurantService();
            const id = generateObjectId();
            RestaurantModel.findById = jest.fn().mockResolvedValue(null);
            
            try {
                await service.generateQRCode(id)
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to find a restaurant with id ${id}`))
            }
        });
    });

    describe("registerRestaurant", () => {

    })
})