jest.mock("../../../src/services/CheckInService");
import CheckInService from "../../../src/services/CheckInService";
import CheckInController from "../../../src/controllers/CheckIn/CheckInController";
import { mockRequest, mockResponse } from "mock-req-res";

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
            const report = `"a"\n"1"`
            CheckInService.prototype.restaurantExists = jest.fn().mockResolvedValue(true);
            CheckInService.prototype.getRestaurantReport = jest.fn().mockResolvedValue(
                report
            );
            const controller = new CheckInController();
            const request = mockRequest();
            const response = mockResponse();

            await controller.handleGetReport(request, response);

            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.send).toHaveBeenCalledWith(report)
        });
    })
})
