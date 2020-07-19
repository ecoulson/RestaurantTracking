jest.mock("../../../../src/services/CheckIn/CheckInService");
import CheckInService from "../../../../src/services/CheckIn/CheckInService";
import CheckInController from "../../../../src/controllers/CheckIn/CheckInController";
import { mockRequest, mockResponse } from "mock-req-res";
import faker from "faker";
import Chance from "chance";
import { generateObjectId } from "../../../helpers/mongo";
import OrganizationBroker from "../../../../src/brokers/OrganizationBroker";
import PermissionBuilder from "../../../../src/services/Permission/PermissionBuilder";
import UserBroker from "../../../../src/brokers/UserBroker";
import GetCheckInService from "../../../../src/services/CheckIn/GetCheckInService";
import CheckoutService from "../../../../src/services/CheckIn/CheckoutService";
import CheckInBroker from "../../../../src/brokers/CheckInBroker";
import CheckInGenerator from "../../../mocks/Generators/CheckInGenerator";
import SimpleCheckInQRService from "../../../../src/services/CheckIn/SimpleCheckInQRService";

const chance = new Chance();
const checkInGenerator = new CheckInGenerator();

beforeEach(() => {
    jest.resetAllMocks();
})

describe("Check In Controller Suite", () => {
    describe("handleCheckIn", () => {
        test("Successful check in", async () => {
            const checkIn = checkInGenerator.generate()
            CheckInService.prototype.checkIn = jest.fn().mockResolvedValue(checkIn)
            const controller = new CheckInController(
                new CheckInService(
                    new OrganizationBroker(),
                    new PermissionBuilder(),
                    new UserBroker()
                ),
                new GetCheckInService(new CheckInBroker()),
                new CheckoutService(new CheckInBroker()),
                new SimpleCheckInQRService()
            );
            const request = mockRequest({
                user: {
                    _id: generateObjectId()
                }
            });
            const response = mockResponse();

            await controller.handleCheckIn()(request, response);

            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({
                success: true,
                data: checkIn
            })
        })
    })

    describe("handleGetReport", () => {
        test("Gets a report", async () => {
            const entry = {
                id : generateObjectId(),
                ip : faker.internet.ip(),
                number : chance.phone({ country: 'us' }),
                email : faker.internet.email(),
                timeCheckedIn : new Date().toUTCString(),
            }
            const record = [entry]
            CheckInService.prototype.getOrganizationReport = jest.fn().mockResolvedValue(
                record
            );
            const controller = new CheckInController(
                new CheckInService(
                    new OrganizationBroker(),
                    new PermissionBuilder(),
                    new UserBroker()
                ),
                new GetCheckInService(new CheckInBroker()),
                new CheckoutService(new CheckInBroker()),
                new SimpleCheckInQRService()
            );
            const request = mockRequest();
            const response = mockResponse();

            await controller.handleGetReport()(request, response);

            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.send).toHaveBeenCalledWith(record);
        });
    })
})
