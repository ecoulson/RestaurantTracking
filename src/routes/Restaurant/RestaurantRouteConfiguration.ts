import { hapiValidation } from "../../middleware/validation";
import { authenticate } from "../../middleware/authentication";
import { 
    GenerateQRCodeSchema, 
    RegisterRestaurantSchema,
    FindRestaurantByIdSchema
} from "./RestaurantRouteSchemas";
import RouterConfiguration from "../RouterConfiguration";
import RestaurantController from "../../controllers/Restaurant/RestaurantController";
import { catchErrors } from "../../middleware/error-handling";

export default class RestaurantRouteConfiguration extends RouterConfiguration<RestaurantController> {
    constructor() {
        super(new RestaurantController());
    }

    configureRoutes() {
        this.router.get(
            "/:restaurantId/generate",
            [authenticate, hapiValidation(GenerateQRCodeSchema, "params")], 
            catchErrors(this.controller.handleQRCodeGeneration)
        );
            
        this.router.post(
            "/register",
            authenticate, hapiValidation(RegisterRestaurantSchema, "body"),
            catchErrors(this.controller.handleRestaurantRegistration)
        )
        
        this.router.get(
            "/:restaurantId",
            hapiValidation(FindRestaurantByIdSchema, "params"),
            catchErrors(this.controller.handleGetRestaurantByID)
        );
    }
}