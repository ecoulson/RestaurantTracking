import IRegistrationBody from "../../../src/controllers/User/IRegistrationBody";
import faker from "faker";
import IGenerator from "./IGenerator";

export default class RandomRegistrationBody implements IGenerator<IRegistrationBody> {
    generate() {
        return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
    }
}