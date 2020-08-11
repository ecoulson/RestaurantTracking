import PermissionSetService from "../../../../src/services/Permission/PermissionSetService"
import PermissionSetBroker from "../../../../src/brokers/PermissionSetBroker";
import PermissionSetGenerator from "../../../mocks/Generators/PermissionSetGenerator";

const permissionSetGenerator = new PermissionSetGenerator();

describe("Permission set service suite", () => {
    describe("create", () => {
        test("Creates permission set", async () => {
            const permissionSet = permissionSetGenerator.generate()
            PermissionSetBroker.prototype.save = 
                jest.fn().mockResolvedValue(permissionSet);
            const service = new PermissionSetService(
                new PermissionSetBroker()
            );

            const createdSet = await service.create("Test")

            expect(createdSet).toEqual(permissionSet);
        })
    })
})