import PasswordUpdateService from "../../../../../src/services/User/PasswordUpdate/PasswordUpdateService"
import UserGenerator from "../../../../mocks/Generators/UserGenerator";
import faker from "faker";
import bcrypt from "bcrypt"
import UserBroker from "../../../../../src/brokers/UserBroker";

jest.mock("bcrypt");

const userGenerator = new UserGenerator();

describe("Password Update Service", () => {
    test("Correct Password", async () => {
        const newPassword = faker.internet.password();
        bcrypt.compare =
            jest.fn().mockResolvedValue(true)
        bcrypt.hash = 
            jest.fn().mockResolvedValue(newPassword)
        UserBroker.prototype.save = jest.fn().mockImplementation(x => x);
        const user = userGenerator.generate();
        const service = new PasswordUpdateService(new UserBroker());

        const updatedUser = await service.updatePassword(
            user, 
            user.password, 
            newPassword
        );

        expect(updatedUser.password).toEqual(newPassword)
    })
})