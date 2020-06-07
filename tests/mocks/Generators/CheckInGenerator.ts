import IGenerator from "./IGenerator";
import ICheckIn from "../../../src/controllers/CheckIn/ICheckIn";
import CheckInModel from "../../../src/models/check-in/CheckInModel";
import faker from 'faker';
import Chance from "chance";
import { generateObjectId } from "../../helpers/mongo";

const chance = new Chance();

export default class CheckInGenerator implements IGenerator<ICheckIn> {
    generate() {
        return new CheckInModel({
            number: chance.phone({ country: 'us' }),
            email: faker.internet.email(),
            restaurantId: generateObjectId(),
            ipAddress: faker.internet.ip(),
            timeCheckedIn: faker.date.recent()
        })
    }
}