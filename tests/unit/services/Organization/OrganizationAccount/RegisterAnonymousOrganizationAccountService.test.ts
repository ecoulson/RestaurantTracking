import UserBroker from "../../../../../src/brokers/UserBroker"
import UserPermissionSetupService from "../../../../../src/services/User/Registration/UserPermissionSetupService"
import OrganizationBroker from "../../../../../src/brokers/OrganizationBroker"
import RegisterAnonymousOrganizationAccountService from "../../../../../src/services/Organization/OrganizationAccount/RegisterAnonymousOrganizationAccountService"
import faker from "faker";
import { generateObjectId } from "../../../../helpers/mongo";
import OrganizationGenerator from "../../../../mocks/Generators/OrganizationGenerator";
import OrganizationModel from "../../../../../src/models/Organization/OrganizationModel";
import UserGenerator from "../../../../mocks/Generators/UserGenerator";
import PermissionSetService from "../../../../../src/services/Permission/PermissionSetService";
import PermissionSetBroker from "../../../../../src/brokers/PermissionSetBroker";

const organizationGenerator = new OrganizationGenerator();
const userGenerator = new UserGenerator();

describe("Register Anonymous Organization Account Service", () => {
    test("Organization does not exist", async () => {
        const id = generateObjectId();
        OrganizationBroker.prototype.findOrganizationById = 
            jest.fn().mockResolvedValue(null);
        const service = new RegisterAnonymousOrganizationAccountService(
            new UserBroker(),
            new UserPermissionSetupService(
                new PermissionSetService(new PermissionSetBroker())
            ),
            new OrganizationBroker()
        )

        try {
            await service.register({
                email: faker.internet.email(),
                password: faker.internet.password(),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                organizationId: id,
                username: faker.internet.userName()
            })
        } catch (error) {
            expect(error).toEqual(new Error(
                `No organization with id: ${id}`
            ))
        }

        expect.assertions(1);
    })

    test("Organization does not exist", async () => {
        const organization = organizationGenerator.generate();
        OrganizationBroker.prototype.findOrganizationById = 
            jest.fn().mockResolvedValue(organization);
        UserBroker.prototype.createUser = 
            jest.fn().mockReturnValue(userGenerator.generate())
        UserBroker.prototype.save = jest.fn().mockImplementation(x => x);
        UserPermissionSetupService.prototype.setup = jest.fn();
        OrganizationModel.prototype.addStudent = jest.fn();
        const service = new RegisterAnonymousOrganizationAccountService(
            new UserBroker(),
            new UserPermissionSetupService(
                new PermissionSetService(new PermissionSetBroker())
            ),
            new OrganizationBroker()
        )
        const params = {
            email: faker.internet.email(),
            password: faker.internet.password(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            organizationId: organization.organizationId,
            username: faker.internet.userName()
        };

        const user = await service.register(params)

        expect(user.organizations)
            .toContain(organization.organizationId)
    })
})