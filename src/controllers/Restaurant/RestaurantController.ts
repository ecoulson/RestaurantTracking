import RestaurantService from "../../services/RestaurantService";
import { Request, Response } from "express";
import IRestaurantRegistration from "./IRestaurantRegistration";
import { Response as ResponseHelper } from "../../lib/HTTP"
import { streamQRCode } from "../../lib/QR-code";

export default class RestaurantController {
    private restaurantService : RestaurantService;

    constructor() {
        this.restaurantService = new RestaurantService();
        this.handleQRCodeGeneration = this.handleQRCodeGeneration.bind(this);
        this.handleGetRestaurantByID = this.handleGetRestaurantByID.bind(this);
        this.handleRestaurantRegistration = this.handleRestaurantRegistration.bind(this);
    }

    async handleRestaurantRegistration(req : Request, res : Response) {
        const restaurantRegistration = req.body as IRestaurantRegistration;
        await this.restaurantService.registerRestaurant(restaurantRegistration);
        return ResponseHelper.sendData(res, {
            message: `Successfully registered ${restaurantRegistration.name}`,
        });
    }

    async handleQRCodeGeneration(req : Request, res : Response) {
        const restaurantId : string = req.params.restaurantId;
        const restaurant = await this.restaurantService.generateQRCode(restaurantId)
        return streamQRCode(res, restaurant);
    }

    async handleGetRestaurantByID(req : Request, res : Response) {
        const restaurantId : string = req.params.restaurantId;
        const restaurant = await this.restaurantService.getRestaurant(restaurantId);
        return ResponseHelper.sendData(res, {
            restaurant
        });
    }
}