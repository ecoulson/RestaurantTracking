import { createModelMock } from "../mocks/models";
createModelMock("../../src/models/restaurant/RestaurantModel");
import RestaurantModel from "../../src/models/restaurant/RestaurantModel";
import * as RestaurantService from "../../src/services/restaurant";
import { mockRequest, mockResponse } from "mock-req-res";

describe("Restaurant Service Test", () => {
    describe("Generate QR Code", () => {
        test("Generate a QR Code for a restaurant that doesn't exist", async () => {
            (RestaurantModel.findById as jest.Mock).mockResolvedValue(null);
            const req = mockRequest({
                params: {
                    restaurantId: null
                }
            });
            const res = mockResponse();
            
            await RestaurantService.generateQRCode(req, res);

            expect(res.status).toHaveBeenCalledWith(400)
        })
    });
})