import IGenerator from "./IGenerator";
import IRestaurantRegistration from "../../../src/controllers/Restaurant/IRestaurantRegistration";
import faker from "faker";
import Chance from "chance";

const chance = new Chance();

export default class RestaurantRegistrationGenerator implements IGenerator<IRestaurantRegistration> {
    generate() {
        return {
            name: faker.company.companyName(),
            number: chance.phone({ country: "us" })
        };
    }
}