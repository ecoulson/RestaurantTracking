import AuthenticationService from "../../../../src/services/Authentication/AuthenticationService"
import PermissionBroker from "../../../../src/brokers/PermissionBroker"
import PermissionSetBroker from "../../../../src/brokers/PermissionSetBroker"
import UserBroker from "../../../../src/brokers/UserBroker"
import SyncCheckInsService from "../../../../src/services/CheckIn/SyncCheckInsService"
import UserGenerator from "../../../mocks/Generators/UserGenerator"
import CheckInBroker from "../../../../src/brokers/CheckInBroker"
import faker from "faker";
import jsonwebtoken from "jsonwebtoken"
import PermissionGenerator from "../../../mocks/Generators/PermissionGenerator"
import PermissionSetGenerator from "../../../mocks/Generators/PermissionSetGenerator"
import CheckInGenerator from "../../../mocks/Generators/CheckInGenerator"
import PermissionModel from "../../../../src/models/Permission/PermissionModel"
import PermissionSetModel from "../../../../src/models/PermissionSet/PermissionSetModel"

jest.mock("jsonwebtoken");

const userGenerator = new UserGenerator();
const checkInGenerator = new CheckInGenerator();
const permissionGenerator = new PermissionGenerator();
const permissionSetGenerator = new PermissionSetGenerator();

describe("Sync Check Ins Service", () => {
    test("No check ins to sync", async () => {
        AuthenticationService.prototype.login =
            jest.fn().mockResolvedValue(userGenerator.generate());
        CheckInBroker.prototype.getUserCheckIns = 
            jest.fn().mockResolvedValue([]);
        PermissionBroker.prototype.findOneByResourceId = jest.fn();
        PermissionBroker.prototype.remove = jest.fn();
        PermissionSetBroker.prototype.findByName = jest.fn();
        PermissionSetBroker.prototype.delete = jest.fn();
        UserBroker.prototype.delete = jest.fn()
        jsonwebtoken.sign = jest.fn().mockResolvedValue("token");
        const service = new SyncCheckInsService(
            new AuthenticationService(),
            new CheckInBroker(),
            new PermissionBroker(),
            new PermissionSetBroker(),
            new UserBroker()
        )

        const token = await service.syncCheckIns(
            userGenerator.generate(),
            faker.internet.userName(),
            faker.internet.password(),
            faker.name.firstName()
        )

        expect(PermissionBroker.prototype.findOneByResourceId)
            .toHaveBeenCalledTimes(0)
        expect(UserBroker.prototype.delete)
            .toHaveBeenCalledTimes(1)
        expect(token).toEqual("token");
    })

    test("No user permission set for user to update", async () => {
        const userToUpdate = userGenerator.generate();
        AuthenticationService.prototype.login =
            jest.fn().mockResolvedValue(userToUpdate);
        CheckInBroker.prototype.getUserCheckIns = 
            jest.fn().mockResolvedValue([
                checkInGenerator.generate()
            ]);
        CheckInBroker.prototype.save =
            jest.fn().mockImplementation(x => x);
        PermissionBroker.prototype.findOneByResourceId = 
            jest.fn().mockResolvedValue(permissionGenerator.generate());
        PermissionBroker.prototype.remove = jest.fn();
        PermissionSetBroker.prototype.findByName = 
            jest.fn().mockResolvedValue(null);
        PermissionSetBroker.prototype.delete = jest.fn();
        UserBroker.prototype.delete = jest.fn()
        jsonwebtoken.sign = jest.fn().mockResolvedValue("token");
        const service = new SyncCheckInsService(
            new AuthenticationService(),
            new CheckInBroker(),
            new PermissionBroker(),
            new PermissionSetBroker(),
            new UserBroker()
        )

        try {
            await service.syncCheckIns(
                userGenerator.generate(),
                faker.internet.userName(),
                faker.internet.password(),
                faker.name.firstName()
            )
        } catch (error) {
            expect(error).toEqual(new Error(
                `No permission set for user ${userToUpdate._id}`
            ))
        }

        expect.assertions(1);
    });

    test("No user permission to delete", async () => {
        const userToSync = userGenerator.generate();
        const permission = permissionGenerator.generate();
        const checkIn = checkInGenerator.generate();
        AuthenticationService.prototype.login =
            jest.fn().mockResolvedValue(userToSync);
        CheckInBroker.prototype.getUserCheckIns = 
            jest.fn().mockResolvedValue([ checkIn ]);
        CheckInBroker.prototype.save =
            jest.fn().mockImplementation(x => x);
        PermissionBroker.prototype.findOneByResourceId = 
            jest.fn().mockResolvedValueOnce(permission);
        PermissionModel.prototype.save = jest.fn().mockImplementation(x => x);
        PermissionBroker.prototype.findOneByResourceId = 
            jest.fn().mockResolvedValueOnce(null);
        PermissionBroker.prototype.remove = jest.fn();
        PermissionSetBroker.prototype.findByName = 
            jest.fn().mockResolvedValue(permissionSetGenerator.generate());
        PermissionSetBroker.prototype.delete = jest.fn();
        UserBroker.prototype.delete = jest.fn()
        jsonwebtoken.sign = jest.fn().mockResolvedValue("token");
        const service = new SyncCheckInsService(
            new AuthenticationService(),
            new CheckInBroker(),
            new PermissionBroker(),
            new PermissionSetBroker(),
            new UserBroker()
        )

        try {
            await service.syncCheckIns(
                userGenerator.generate(),
                faker.internet.userName(),
                faker.internet.password(),
                faker.name.firstName()
            )
        } catch (error) {
            expect(error).toEqual(new Error(
                `No permission for resource with id: ${checkIn._id}`
            ))
        }

        expect.assertions(1);
    })

    test("Syncs check ins", async () => {
        const userToSync = userGenerator.generate();
        const permission = permissionGenerator.generate();
        const checkIn = checkInGenerator.generate();
        AuthenticationService.prototype.login =
            jest.fn().mockResolvedValue(userToSync);
        CheckInBroker.prototype.getUserCheckIns = 
            jest.fn().mockResolvedValue([ checkIn ]);
        CheckInBroker.prototype.save =
            jest.fn().mockImplementation(x => x);
        PermissionModel.prototype.save = jest.fn().mockImplementation(x => x);
        PermissionBroker.prototype.findOneByResourceId = 
            jest.fn().mockResolvedValue(permission);
        PermissionBroker.prototype.remove = jest.fn().mockResolvedValue(null);
        PermissionSetBroker.prototype.findByName = 
            jest.fn().mockResolvedValue(permissionSetGenerator.generate());
        PermissionSetBroker.prototype.delete = jest.fn().mockResolvedValue(null);
        PermissionSetModel.prototype.addPermission =
            jest.fn().mockResolvedValue(permission);
        UserBroker.prototype.delete = jest.fn().mockResolvedValue(null)
        jsonwebtoken.sign = jest.fn().mockResolvedValue("token");
        const service = new SyncCheckInsService(
            new AuthenticationService(),
            new CheckInBroker(),
            new PermissionBroker(),
            new PermissionSetBroker(),
            new UserBroker()
        )

        const token = await service.syncCheckIns(
            userGenerator.generate(),
            faker.internet.userName(),
            faker.internet.password(),
            faker.name.firstName()
        );

        expect(token).toEqual("token");
    })
})