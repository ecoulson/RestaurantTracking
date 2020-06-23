jest.mock("../../../../src/services/CheckIn/CheckInService");
import CheckInService from "../../../../src/services/CheckIn/CheckInService";
import CheckInController from "../../../../src/controllers/CheckIn/CheckInController";
import { mockRequest, mockResponse } from "mock-req-res";
import faker from "faker";
import Chance from "chance";
import { generateObjectId } from "../../../helpers/mongo";

const chance = new Chance();

beforeEach(() => {
    jest.resetAllMocks();
})

describe("Check In Controller Suite", () => {
    describe("handleCheckIn", () => {
        test("Failed to check in", async () => {
            CheckInService.prototype.checkIn = jest.fn().mockRejectedValue(new Error());
            const controller = new CheckInController();
            const id = generateObjectId();
            const request = mockRequest({
                body: {
                    restaurantId: id
                }
            });
            const response = mockResponse();

            try {
                await controller.handleCheckIn(request, response);
            } catch (error) {
                expect(error).toEqual(new Error())
            }
            expect.assertions(1);
        });

        test("Successful check in", async () => {
            const controller = new CheckInController();
            const request = mockRequest();
            const response = mockResponse();

            await controller.handleCheckIn(request, response);

            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({
                success: true,
                data: {
                    message: "Successfully checked in"
                }
            })
        })
    })

    describe("handleGetReport", () => {
        test("Tries to get a report for a restaurant that does not exisit", async () => {
            CheckInService.prototype.getRestaurantReport = jest.fn().mockRejectedValue(new Error());
            const controller = new CheckInController();
            const request = mockRequest();
            const response = mockResponse();

            try {
                await controller.handleGetReport(request, response);
            } catch (error) {
                expect(error).toEqual(new Error())
            }
            expect.assertions(1);
        })
        
        test("Gets a report", async () => {
            const entry = {
                id : generateObjectId(),
                ip : faker.internet.ip(),
                number : chance.phone({ country: 'us' }),
                email : faker.internet.email(),
                timeCheckedIn : new Date().toUTCString(),
            }
            const record = [entry]
            CheckInService.prototype.getRestaurantReport = jest.fn().mockResolvedValue(
                record
            );
            const controller = new CheckInController();
            const request = mockRequest();
            const response = mockResponse();

            await controller.handleGetReport(request, response);

            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.send).toHaveBeenCalledWith(record);
        });
    })
})
