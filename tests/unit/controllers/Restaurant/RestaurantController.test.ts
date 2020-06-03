jest.mock("../../../../src/lib/URL-shortener");
jest.mock("../../../../src/services/RestaurantService");
jest.mock("qrcode");
import RestaurantController from "../../../../src/controllers/Restaurant/RestaurantController";
import RestaurantService from "../../../../src/services/RestaurantService";
import { mockResponse, mockRequest } from "mock-req-res";
import faker from "faker";
import { generateObjectId } from "../../../helpers/mongo";
import qrcode from "qrcode";

beforeEach(() => {
    jest.resetAllMocks();
})

describe("Restaurant Controller Suite", () => {
    describe("handleRestaurantRegistration", () => {
        test("Fails to register route", async () => {
            RestaurantService.prototype.registerRestaurant = jest.fn().mockRejectedValue(new Error());
            const name = faker.company.companyName();
            const request = mockRequest({
                body: {
                    name
                }
            });
            const response = mockResponse();
            const controller = new RestaurantController();

            try {
                await controller.handleRestaurantRegistration(request, response);
            } catch (error) {
                expect(error).toEqual(new Error());
            }
            expect.assertions(1);
        })

        test("Successful registration", async () => {
            const name = faker.company.companyName();
            const request = mockRequest({
                body: {
                    name
                }
            });
            const response = mockResponse();
            const controller = new RestaurantController();

            await controller.handleRestaurantRegistration(request, response);

            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({
                success: true,
                data: {
                    message: `Successfully registered ${name}`
                }
            })
        })
    });

    describe("handleQRCodeGeneration", () => {
        test("Fails to generate a QR Code", async () => {
            RestaurantService.prototype.generateQRCode = jest.fn().mockRejectedValue(new Error());
            const request = mockRequest();
            const response = mockResponse();
            const controller = new RestaurantController();

            try {
                await controller.handleQRCodeGeneration(request, response);
            } catch(error) {
                expect(error).toEqual(error);
            }
            expect.assertions(1);
        })

        test("Successfully generates QR Code", async () => {
            RestaurantService.prototype.generateQRCode = jest.fn().mockResolvedValue({
                url: ""
            })
            const restaurantId = generateObjectId()
            const request = mockRequest({
                params: {
                    restaurantId
                }
            });
            const response = mockResponse();
            const controller = new RestaurantController();

            await controller.handleQRCodeGeneration(request, response);

            expect(qrcode.toFileStream).toHaveBeenCalled();
        });
    });

    describe("handleGetRestaurantById", () => {
        test("Fails to get restaurant by id", async () => {
            RestaurantService.prototype.getRestaurant = jest.fn().mockRejectedValue(new Error());
            const request = mockRequest();
            const response = mockResponse();
            const controller = new RestaurantController();

            try {
                await controller.handleGetRestaurantByID(request, response);
            } catch (error) {
                expect(error).toEqual(new Error());
            }
            expect.assertions(1);
        })

        test("Gets restaurant by id", async () => {
            RestaurantService.prototype.getRestaurant = jest.fn().mockResolvedValue({})
            const request = mockRequest();
            const response = mockResponse();
            const controller = new RestaurantController();

            await controller.handleGetRestaurantByID(request, response);

            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({
                success: true,
                data: {
                    restaurant: {}
                }
            })
        })
    });

    describe("handleGetAllRestaurants", () => {
        test("Fails to get all restaurants", async () => {
            RestaurantService.prototype.getAllRestaurants = jest.fn().mockRejectedValue(new Error());
            const request = mockRequest();
            const response = mockResponse();
            const controller = new RestaurantController();

            try {
                await controller.handleGetAllRestaurants(request, response);
            } catch (error) {
                expect(error).toEqual(new Error());
            }
            expect.assertions(1);
        })

        test("Gets all restaurants", async () => {
            RestaurantService.prototype.getAllRestaurants = jest.fn().mockResolvedValue([]);
            const request = mockRequest();
            const response = mockResponse();
            const controller = new RestaurantController();

            await controller.handleGetAllRestaurants(request, response);

            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({
                success: true,
                data: {
                    restaurants: []
                }
            })
        });
    })
})