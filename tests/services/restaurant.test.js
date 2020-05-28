require("../mocks/models")("../../src/models/Restaurant");
const Restaurant = require("../../src/models/restaurant");
const RestaurantService = require("../../src/services/restaurant");
const { mockRequest, mockResponse } = require("mock-req-res");

describe("Restaurant Service Test", () => {
    describe("Generate QR Code", () => {
        test("Generate a QR Code for a restaurant that doesn't exist", async () => {
            Restaurant.findById.mockResolvedValue(null);
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