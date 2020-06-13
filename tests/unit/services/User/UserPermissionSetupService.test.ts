import UserModel from "../../../../src/models/user/UserModel"

describe("User Permission Setup Service Suite", () => {
    describe("setup", () => {
        test("Fails to save user", () => {
            UserModel.prototype.save = jest.fn().mockRejectedValue(new Error());
        })
    })
})