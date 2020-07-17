import CheckInService from "../../../../src/services/CheckIn/CheckInService";
import CheckInModel from "../../../../src/models/CheckIn/CheckInModel";
import faker from "faker";
import CSV from "../../../../src/lib/HTTP/CSV";
import CheckInBodyGenerator from "../../../mocks/Generators/CheckInBodyGenerator";
import OrganizationGenerator from "../../../mocks/Generators/OrganizationGenerator";
import CheckInGenerator from "../../../mocks/Generators/CheckInGenerator";
import OrganizationBroker from "../../../../src/brokers/OrganizationBroker";
import PermissionBuilder from "../../../../src/services/Permission/PermissionBuilder";
import UserBroker from "../../../../src/brokers/UserBroker";
import PermissionModel from "../../../../src/models/Permission/PermissionModel";
import UserModel from "../../../../src/models/User/UserModel";
import UserGenerator from "../../../mocks/Generators/UserGenerator";

jest.mock("../../../../src/brokers/OrganizationBroker");
jest.mock("../../../../src/brokers/UserBroker");
jest.mock("../../../../src/models/Organization/OrganizationModel");

const checkInBodyGenerator = new CheckInBodyGenerator();
const userGenerator = new UserGenerator();
const checkInGenerator = new CheckInGenerator();
const organizationGenerator = new OrganizationGenerator();

describe("Check In Service Test", () => {
    describe("checkIn", () => {
        test("A check in to a restaurant that does not exist", async () => {
            CheckInModel.prototype.save = jest.fn().mockResolvedValue(null);
            PermissionModel.prototype.save = jest.fn();
            UserBroker.prototype.findById = jest.fn().mockResolvedValue(userGenerator.generate())
            UserModel.prototype.addPermission = jest.fn()
            OrganizationBroker.prototype.findOrganizationById = jest.fn().mockResolvedValue(null);
            const service = new CheckInService(
                new OrganizationBroker(),
                new PermissionBuilder(),
                new UserBroker()
            );
            const checkInBody = checkInBodyGenerator.generate()

            try {
                await service.checkIn(checkInBody, faker.internet.ip());
            } catch(error) {
                expect(error).toEqual(
                    new Error("Can not check in to an organization that does not exist")
                );
            }
            expect.assertions(1)
        });

        test("A check in with a provided timeCheckedIn", async () => {
            const checkIn = checkInGenerator.generate();
            CheckInModel.prototype.save = jest.fn().mockResolvedValue(checkIn);
            PermissionModel.prototype.save = jest.fn();
            UserBroker.prototype.findById = jest.fn().mockResolvedValue(userGenerator.generate())
            UserModel.prototype.addPermission = jest.fn()
            OrganizationBroker.prototype.findOrganizationById = jest.fn().mockResolvedValue(organizationGenerator.generate());
            const service = new CheckInService(
                new OrganizationBroker(),
                new PermissionBuilder(),
                new UserBroker()
            );

            const checkInDocument = await service.checkIn(checkIn, checkIn.ipAddress);

            expect(checkInDocument.serialize()).toEqual(checkIn.serialize());
        })

        test("A successful check in", async () => {
            const organization = organizationGenerator.generate();
            const checkIn = checkInGenerator.generate();
            UserBroker.prototype.findById = jest.fn().mockResolvedValue(userGenerator.generate())
            UserModel.prototype.addPermission = jest.fn();
            CheckInModel.prototype.save = jest.fn().mockResolvedValue(checkIn);
            PermissionModel.prototype.save = jest.fn();
            OrganizationBroker.prototype.findOrganizationById = jest.fn().mockResolvedValue(organization);

            const service = new CheckInService(
                new OrganizationBroker(),
                new PermissionBuilder(),
                new UserBroker()
            );

            const checkInDocument = await service.checkIn(checkIn, checkIn.ipAddress);

            expect(checkInDocument).toEqual(checkIn);
        })
    });

    describe("getRestaurantReport", () => {
        test("A successful get check ins request with no entries", async () => {
            const service = new CheckInService(
                new OrganizationBroker(),
                new PermissionBuilder(),
                new UserBroker()
            );
            const checkIn = checkInGenerator.generate();
            CheckInModel.findByOrganizationId = jest.fn().mockResolvedValue([]);

            const report = await service.getOrganizationReport(checkIn._id);

            expect(report).toEqual("");
        })
        
        test("A successful get check ins request", async () => {
            const service = new CheckInService(
                new OrganizationBroker(),
                new PermissionBuilder(),
                new UserBroker()
            );
            const checkIn = checkInGenerator.generate();
            CheckInModel.findByOrganizationId = jest.fn().mockResolvedValue([ checkIn ]);

            const report = await service.getOrganizationReport(checkIn._id);

            expect(report).toEqual(CSV.JSONtoCSV([ checkIn.serialize() ]));
        })

        test("A successful get check ins request multiple rows", async () => {
            const service = new CheckInService(
                new OrganizationBroker(),
                new PermissionBuilder(),
                new UserBroker()
            );
            const checkIn = checkInGenerator.generate();
            const record = [ checkIn, checkIn, checkIn ];
            CheckInModel.findByOrganizationId = jest.fn().mockResolvedValue(record);

            const report = await service.getOrganizationReport(checkIn._id);

            expect(report).toEqual(CSV.JSONtoCSV(record.map((entry) => entry.serialize())));
        })
    })
});