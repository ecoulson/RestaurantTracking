import { createModelMock } from "../mocks/models";
createModelMock("../../src/models/restaurant/RestaurantModel");
import RestaurantModel from "../../src/models/restaurant/RestaurantModel";
import RestaurantService from "../../src/services/RestaurantService";

describe("Restaurant Service Test", () => {
    describe("Generate QR Code", () => {
        test("Generate a QR Code for a restaurant that doesn't exist", async () => {
            const service = new RestaurantService();
            (RestaurantModel.findById as jest.Mock).mockResolvedValue(null);
            
            try {
                await service.generateQRCode("")
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to find a restaurant with id `))
            }
        })
    });
})