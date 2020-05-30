import { hapiValidation } from "../../middleware/validation";
import { authenticate } from "../../middleware/authentication";
import { 
    GenerateQRCodeSchema, 
    RegisterRestaurantSchema,
    FindRestaurantByIdSchema
} from "./RestaurantRouteSchemas";
import RouterConfiguration from "../RouterConfiguration";
import RestaurantController from "../../controllers/Restaurant/RestaurantController";

export default class RestaurantRouteConfiguration extends RouterConfiguration<RestaurantController> {
    constructor() {
        super(new RestaurantController());
    }

    configureRoutes() {
        this.get(
            "/:restaurantId/generate",
            [ authenticate, hapiValidation(GenerateQRCodeSchema, "params")], 
            this.controller.handleQRCodeGeneration
        );

        this.post(
            "/register",
            [authenticate, hapiValidation(RegisterRestaurantSchema, "body")],
            this.controller.handleRestaurantRegistration
        )

        this.get(
            "/:restaurantId",
            [ hapiValidation(FindRestaurantByIdSchema, "params") ],
            this.controller.handleGetRestaurantByID
        )
    }
}