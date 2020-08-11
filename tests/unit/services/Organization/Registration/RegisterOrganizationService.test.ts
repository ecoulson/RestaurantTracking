import RegisterOrganizationService from "../../../../../src/services/Organization/Registration/RegisterOrganizationService"
import PermissionSetService from "../../../../../src/services/Permission/PermissionSetService"
import PermissionSetBroker from "../../../../../src/brokers/PermissionSetBroker"
import faker from "faker";
import UserGenerator from "../../../../mocks/Generators/UserGenerator";
import PermissionSetGenerator from "../../../../mocks/Generators/PermissionSetGenerator";
import PermissionSetModel from "../../../../../src/models/PermissionSet/PermissionSetModel";
import PermissionGenerator from "../../../../mocks/Generators/PermissionGenerator";
import UserModel from "../../../../../src/models/User/UserModel";
import OrganizationModel from "../../../../../src/models/Organization/OrganizationModel";
import PermissionModel from "../../../../../src/models/Permission/PermissionModel";
import { generateObjectId } from "../../../../helpers/mongo";

const userGenerator = new UserGenerator();
const permissionSetGenerator = new PermissionSetGenerator();
const permissionGenerator = new PermissionGenerator();

describe("Register Organization Service", () => {
    test("Register organization", async () => {
        const permissionSet = permissionSetGenerator.generate();
        const permission = permissionGenerator.generate();
        PermissionSetService.prototype.create =
            jest.fn().mockResolvedValue(permissionSet)
        PermissionSetModel.prototype.save =
            jest.fn().mockResolvedValue(permission)
        PermissionSetModel.prototype.addPermission = jest.fn()
        UserModel.prototype.addPermissionSet = jest.fn()
        OrganizationModel.prototype.addPermissionSet = jest.fn();
        OrganizationModel.prototype.save = jest.fn();
        PermissionModel.prototype.save = jest.fn();
        const service = new RegisterOrganizationService(
            new PermissionSetService(
                new PermissionSetBroker()
            )
        )
        const address = {
            addressLine1: faker.address.streetAddress(),
            addressLine2: "",
            city: faker.address.city(),
            zip: faker.address.zipCode(),
            country: faker.address.country(),
            state: faker.address.state()
        }
        const organizationId = generateObjectId();
        const organizationName = faker.company.companyName()

        const organization = await service.registerOrganization(
            organizationId,
            organizationName,
            address,
            userGenerator.generate()
        )

        expect(organization.toJSON()).toEqual({
            "_id": organization._id,
            "address": address,
            "apps": [],
            "buildings": [],
            "organizationId": organizationId,
            "organizationName": organizationName,
            "permissionSets": [],
            "stripeId": "",
        })
    })
})