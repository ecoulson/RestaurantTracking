import PasswordResetService from "../../../../src/services/User/PasswordResetService"
import UserGenerator from "../../../mocks/Generators/UserGenerator"
import faker from "faker";
import UserModel from "../../../../src/models/user/UserModel";

const userGenerator = new UserGenerator();

describe("Password Reset Service Suite", () => {
    describe("reset", () => {
        test("Fails to find user due to database error", async () => {
            const user = userGenerator.generate();
            const service = new PasswordResetService();
            UserModel.findById = jest.fn().mockRejectedValue(new Error());

            try {
                await service.reset(user._id, faker.internet.password())
            } catch(error) {
                expect(error).toEqual(
                    new Error(`Failed to find user with id ${user._id}`)
                )
            }
            expect.assertions(1);
        })
    })
})