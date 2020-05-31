jest.mock("../../../src/services/CheckInService");
import CheckInService from "../../../src/services/CheckInService";
import CheckInController from "../../../src/controllers/CheckIn/CheckInController";
import { mockRequest, mockResponse } from "mock-req-res";
import faker from "faker";
import Chance from "chance";
import { generateObjectId } from "../../helpers/mongo";
import CSVResponse from "../../../src/lib/HTTP/CSVResponse";

const chance = new Chance();

describe("Check In Controller Suite", () => {
    describe("handleCheckIn", () => {
        test("Failed to check in", async () => {
            CheckInService.prototype.checkIn = jest.fn().mockResolvedValue(false);
            const controller = new CheckInController();
            const request = mockRequest();
            const response = mockResponse();

            await controller.handleCheckIn(request, response);

            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith({
                success: false,
                data: {
                    error: "Can not check in to a restaurant that does not exist"
                }
            })
        });

        test("Successful check in", async () => {
            CheckInService.prototype.checkIn = jest.fn().mockResolvedValue(true);
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
            CheckInService.prototype.restaurantExists = jest.fn().mockResolvedValue(false);
            const controller = new CheckInController();
            const request = mockRequest();
            const response = mockResponse();

            await controller.handleGetReport(request, response);

            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith({
                success: false,
                data: {
                    error: "Could not create checkin report for restaurant that does not exist"
                }
            })
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
            CheckInService.prototype.restaurantExists = jest.fn().mockResolvedValue(true);
            CheckInService.prototype.getRestaurantReport = jest.fn().mockResolvedValue(
                record
            );
            const controller = new CheckInController();
            const request = mockRequest();
            const response = mockResponse();

            await controller.handleGetReport(request, response);

            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.send).toHaveBeenCalledWith(new CSVResponse().build(record))
        });
    })
})
