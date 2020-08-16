import UserBroker from "../../../../../src/brokers/UserBroker"
import UserGenerator from "../../../../mocks/Generators/UserGenerator"
import UsernameAvailabilityService from "../../../../../src/services/User/Registration/UsernameAvailibilityService";
import faker from "faker";

const userGenerator = new UserGenerator();

describe("Username availability service", () => {
    test("Username exists", async () => {
        const user = userGenerator.generate();
        UserBroker.prototype.findUserByUsername =
            jest.fn().mockResolvedValue(user)
        const service = new UsernameAvailabilityService(new UserBroker());

        const exists = await service.check(user.username)

        expect(exists).toBeTruthy()
    })

    test("Username does not exist", async () => {
        UserBroker.prototype.findUserByUsername =
            jest.fn().mockResolvedValue(null)
        const service = new UsernameAvailabilityService(new UserBroker());

        const exists = await service.check(faker.internet.userName())

        expect(exists).toBeFalsy()
    })
})