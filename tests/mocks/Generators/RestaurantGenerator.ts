import IGenerator from "./IGenerator";
import IRestaurant from "../../../src/models/restaurant/IRestaurant";
import faker from "faker";
import Chance from "chance";
import RestaurantModel from "../../../src/models/restaurant/RestaurantModel";

const chance = new Chance();

export default class RestaurantGenerator implements IGenerator<IRestaurant> {
    generate() {
        return new RestaurantModel({
            name: faker.company.companyName(),
            url: faker.internet.url(),
            number: chance.phone({ country: "us" }),
        });
    }

}