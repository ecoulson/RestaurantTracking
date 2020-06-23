import PermissionSetService from "../../../../src/services/Permission/PermissionSetService"
import PermissionSetModel from "../../../../src/models/PermissionSet/PermissionSetModel";
import PermissionModel from "../../../../src/models/Permission/PermissionModel";

describe("Permission set service suite", () => {
    describe("create", () => {
        test("Error creating permission set", async () => {
            const service = new PermissionSetService();
            PermissionSetModel.prototype.save = jest.fn().mockRejectedValue(new Error());

            try {
                await service.create("Test");
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to save permission set Test`))
            }
        })

        test("Creates permission set", async () => {
            const service = new PermissionSetService();
            const permissionSet = getPermissionSet("Test");
            PermissionSetModel.prototype.save = jest.fn().mockResolvedValue(permissionSet)

            const createdSet = await service.create("Test")

            expect(createdSet).toEqual(permissionSet);
        })
    })
})

function getPermissionSet(name : string) {
    return new PermissionModel({ name })
}