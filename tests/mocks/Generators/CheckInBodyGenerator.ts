import IGenerator from "./IGenerator";
import ICheckInBody from "../../../src/controllers/CheckIn/ICheckInBody";
import faker from "faker";
import { generateObjectId } from "../../helpers/mongo";

export default class CheckInBodyGenerator implements IGenerator<ICheckInBody> {
    private organizationId : string | null;

    generate() {
        const body = {
            userId: generateObjectId(),
            organizationId: this.organizationId ? this.organizationId : faker.company.bsNoun(),
            building: faker.name.firstName()
        }
        this.reset();
        return body;
    }

    reset() {
        this.organizationId = null;
    }

    setOrganizationId(id : string) {
        this.organizationId = id;
    }
}