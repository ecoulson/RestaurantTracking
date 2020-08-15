import UserModel from "../../../../../src/models/User/UserModel"
import UserPermissionSetupService from "../../../../../src/services/User/Registration/UserPermissionSetupService"
import UserGenerator from "../../../../mocks/Generators/UserGenerator"
import PermissionSetService from "../../../../../src/services/Permission/PermissionSetService";
import PermissionModel from "../../../../../src/models/Permission/PermissionModel";
import PermissionSetModel from "../../../../../src/models/PermissionSet/PermissionSetModel";
import PermissionSetBroker from "../../../../../src/brokers/PermissionSetBroker";

const userGenerator = new UserGenerator();

describe("User Permission Setup Service Suite", () => {
    describe("setup", () => {
        test("Fails to save user", async () => {
            const service = new UserPermissionSetupService(
                new PermissionSetService(
                    new PermissionSetBroker()
                )
            );
            const user = userGenerator.generate();
            const set = getPermissionSet("Test");
            PermissionSetService.prototype.create = jest.fn().mockResolvedValue(set);
            UserModel.prototype.addPermissionSet = jest.fn().mockImplementation(() => {
                user.permissionSets.push(set.id)
            });
            PermissionModel.prototype.save = jest.fn();
            PermissionSetModel.prototype.addPermission = jest.fn().mockImplementation(() => {
                set.permissions.push("test")
            })
            UserModel.prototype.save = jest.fn().mockRejectedValue(new Error());

            try {
                await service.setup(user)
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to save user ${user._id}`))
            }
            expect.assertions(1);
        })

        test("Saves user", async () => {
            const service = new UserPermissionSetupService(
                new PermissionSetService(
                    new PermissionSetBroker()
                )
            );
            const user = userGenerator.generate();
            const set = getPermissionSet("Test");
            PermissionSetService.prototype.create = jest.fn().mockResolvedValue(set);
            UserModel.prototype.addPermissionSet = jest.fn().mockImplementation(() => {
                user.permissionSets.push(set.id)
            });
            PermissionModel.prototype.save = jest.fn();
            PermissionSetModel.prototype.addPermission = jest.fn().mockImplementation(() => {
                set.permissions.push("test")
            })
            UserModel.prototype.save = jest.fn().mockResolvedValue(user);

            const updatedUser = await service.setup(user);

            expect(Array.from(updatedUser.permissionSets)).toEqual([set.id]);
            expect(Array.from(set.permissions)).toEqual(["test"])
        })
    })
})

function getPermissionSet(name : string) {
    return new PermissionSetModel({ name });
}