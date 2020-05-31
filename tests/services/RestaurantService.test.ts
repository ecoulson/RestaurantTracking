jest.mock("../../src/lib/URL-shortener");
import RestaurantModel from "../../src/models/restaurant/RestaurantModel";
import RestaurantService from "../../src/services/RestaurantService";
import { generateObjectId } from "../helpers/mongo";
import faker from "faker";
import Chance from "chance";
import URLShortener from "../../src/lib/URL-shortener";

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
        test("Should save restaurant to database", async () => {
            (URLShortener as jest.Mock).mockResolvedValue({
                data: {
                    link: ""
                }
            })
            RestaurantModel.prototype.save = jest.fn();
            const service = new RestaurantService();
            const restaurantRegistration = {
                name: faker.company.companyName(),
                number: chance.phone({ country: "us" })
            };
            
            await service.registerRestaurant(restaurantRegistration);

            expect(RestaurantModel.prototype.save).toBeCalled();
        });

        test("Fails to save to restaurant to database", async () => {
            RestaurantModel.prototype.save = jest.fn().mockRejectedValue(new Error());
            const service = new RestaurantService();
            const restaurantRegistration = {
                name: faker.company.companyName(),
                number: chance.phone({ country: "us" })
            };
            
            try {
                await service.registerRestaurant(restaurantRegistration);
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to save restaurant ${restaurantRegistration.name} to database`));
            }
            expect.assertions(1);
        })
    });

    describe("getRestaurant", () => {
        test("Successfully finds restaurant", async () => {
            const restaurant = {
                _id: generateObjectId(),
                name: faker.company.companyName(),
                number: chance.phone({ country: "us" })
            }
            RestaurantModel.findById = jest.fn().mockResolvedValue(restaurant);
            const service = new RestaurantService();
            
            const foundRestaurant = await service.getRestaurant(restaurant._id);

            expect(restaurant.name).toEqual(foundRestaurant.name);
            expect(restaurant.number).toEqual(foundRestaurant.number);
            expect(restaurant._id).toEqual(foundRestaurant._id);
        });

        test("Does not find a restaurant with id", async () => {
            const restaurant = {
                _id: generateObjectId(),
                name: faker.company.companyName(),
                number: chance.phone({ country: "us" })
            }
            RestaurantModel.findById = jest.fn().mockResolvedValue(null);
            const service = new RestaurantService();
            
            try {
                await service.getRestaurant(restaurant._id);
            } catch (error) {
                expect(error).toEqual(new Error(`No restaurant with the id ${restaurant._id}`))
            }
            expect.assertions(1);
        });

        test("Does not find a restaurant with id", async () => {
            const restaurant = {
                _id: generateObjectId(),
                name: faker.company.companyName(),
                number: chance.phone({ country: "us" })
            }
            RestaurantModel.findById = jest.fn().mockRejectedValue(new Error());
            const service = new RestaurantService();
            
            try {
                await service.getRestaurant(restaurant._id);
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to find a restaurant with id ${restaurant._id}`))
            }
            expect.assertions(1);
        })
    })

    describe("getAllRestaurants", () => {
        test("Gets all restaurants", async () => {
            RestaurantModel.find = jest.fn().mockResolvedValue([]);
            const service = new RestaurantService();

            const restaurants = await service.getAllRestaurants();

            expect(restaurants).toEqual([]);
        });

        test("Fails to get all restaurants", async () => {
            RestaurantModel.find = jest.fn().mockRejectedValue(new Error());
            const service = new RestaurantService();

            try {
                await service.getAllRestaurants();
            } catch(error) {
                expect(error).toEqual(new Error("Failed to find all restaurants"))
            }
            expect.assertions(1);
        })
    })
})