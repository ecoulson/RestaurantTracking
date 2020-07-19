import IGenerator from "./IGenerator";
import ICheckInBody from "../../../src/controllers/CheckIn/ICheckInBody";
import CheckInModel from "../../../src/models/CheckIn/CheckInModel";
import faker from 'faker';
import { generateObjectId } from "../../helpers/mongo";

export default class CheckInGenerator implements IGenerator<ICheckInBody> {
    private userId : string | null;

    constructor() {
        this.userId = this.userId;
    }

    generate() {
        return new CheckInModel({
            building: faker.name.firstName(),
            userId: this.userId ? this.userId : generateObjectId(),
            organizationId: faker.company.bsNoun(),
            ipAddress: faker.internet.ip(),
            timeCheckedIn: faker.date.recent()
        })
    }

    setUserId(userId: string) {
        this.userId = userId;
    }
}