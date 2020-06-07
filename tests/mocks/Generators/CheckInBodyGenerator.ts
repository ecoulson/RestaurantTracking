import IGenerator from "./IGenerator";
import ICheckIn from "../../../src/controllers/CheckIn/ICheckIn";
import Chance from "chance";
import faker from "faker";
import { generateObjectId } from "../../helpers/mongo";

const chance = new Chance();

export default class CheckInBodyGenerator implements IGenerator<ICheckIn> {
    private restaurantId : string | null;

    generate() {
        const body = {
            number: chance.phone({ country: 'us' }),
            email: faker.internet.email(),
            restaurantId: this.restaurantId ? this.restaurantId : generateObjectId()
        }
        this.reset();
        return body;
    }

    reset() {
        this.restaurantId = null;
    }

    setRestaurantId(id : string) {
        this.restaurantId = id;
    }
}