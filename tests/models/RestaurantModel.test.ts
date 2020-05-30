import faker from 'faker';
import * as TestDatabase from "../helpers/database";
import RestaurantModel from "../../src/models/restaurant/RestaurantModel";

beforeAll(async () => await TestDatabase.connect());
afterEach(async () => await TestDatabase.clearDatabase());
afterAll(async () => await TestDatabase.closeDatabase());

describe('Restaurant Model Suite', () => {
    describe("Create Restaurant", () => {
        test("Successfully Create Restaurant", async () => {
            let restaurant = new RestaurantModel({
                name: faker.company.companyName(),
                number: faker.phone.phoneNumber(),
                url: faker.internet.url()
            });
            await restaurant.save();
    
            let foundRestaurant = await RestaurantModel.findById(restaurant._id).exec();
    
            expect(foundRestaurant.serialize()).toEqual(restaurant.serialize());
        });
    });
});