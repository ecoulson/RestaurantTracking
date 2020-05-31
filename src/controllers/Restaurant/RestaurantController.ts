import RestaurantService from "../../services/RestaurantService";
import { Request, Response } from "express";
import IRestaurantRegistration from "./IRestaurantRegistration";
import { streamQRCode } from "../../lib/QR-code";
import MessageResponse from "../../lib/HTTP/MessageResponse";
import JSONResponse from "../../lib/HTTP/JSONResponse";

export default class RestaurantController {
    private restaurantService : RestaurantService;

    constructor() {
        this.restaurantService = new RestaurantService();
        this.handleQRCodeGeneration = this.handleQRCodeGeneration.bind(this);
        this.handleGetRestaurantByID = this.handleGetRestaurantByID.bind(this);
        this.handleRestaurantRegistration = this.handleRestaurantRegistration.bind(this);
        this.handleGetAllRestaurants = this.handleGetAllRestaurants.bind(this);
    }

    async handleRestaurantRegistration(req : Request, res : Response) {
        const restaurantRegistration = req.body as IRestaurantRegistration;
        await this.restaurantService.registerRestaurant(restaurantRegistration);
        return new MessageResponse(res).send(`Successfully registered ${restaurantRegistration.name}`);
    }

    async handleQRCodeGeneration(req : Request, res : Response) {
        const restaurantId : string = req.params.restaurantId;
        const restaurant = await this.restaurantService.generateQRCode(restaurantId)
        return streamQRCode(res, restaurant);
    }

    async handleGetRestaurantByID(req : Request, res : Response) {
        const restaurantId : string = req.params.restaurantId;
        const restaurant = await this.restaurantService.getRestaurant(restaurantId);
        return new JSONResponse(res).send({
            restaurant
        });
    }

    async handleGetAllRestaurants(req : Request, res : Response) {
        return new JSONResponse(res).send({
            restaurants: await this.restaurantService.getAllRestaurants()
        })
    }
}