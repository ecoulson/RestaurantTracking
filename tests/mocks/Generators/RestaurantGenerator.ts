import IGenerator from "./IGenerator";
import IRestaurant from "../../../src/models/Restaurant/IRestaurant";
import RestaurantModel from "../../../src/models/Restaurant/RestaurantModel";
import faker from "faker";
import Chance from "chance";

const chance = new Chance();

export default class RestaurantGenerator implements IGenerator<IRestaurant> {
    generate() {
        return new RestaurantModel({
            name: faker.company.companyName(),
            number: chance.phone({ country: "us" }),
            url: faker.internet.url()
        })
    }
}