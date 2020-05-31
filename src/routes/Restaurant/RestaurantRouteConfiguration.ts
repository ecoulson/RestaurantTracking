import { hapiValidation } from "../../middleware/validation";
import { 
    GenerateQRCodeSchema, 
    RegisterRestaurantSchema,
    FindRestaurantByIdSchema
} from "./RestaurantRouteSchemas";
import RouterConfiguration from "../RouterConfiguration";
import RestaurantController from "../../controllers/Restaurant/RestaurantController";
import { catchErrors } from "../../middleware/error-handling";
import BasicAuthenticationStrategy from "../../middleware/authentication/BasicAuthenticationStrategy";

export default class RestaurantRouteConfiguration extends RouterConfiguration<RestaurantController> {
    constructor() {
        super(new RestaurantController());
    }

    configureRoutes() {
        this.router.get(
            "/:restaurantId/generate",
            new BasicAuthenticationStrategy().authenticate, 
            hapiValidation(GenerateQRCodeSchema, "params"), 
            catchErrors(this.controller.handleQRCodeGeneration)
        );
            
        this.router.post(
            "/register",
            new BasicAuthenticationStrategy().authenticate, 
            hapiValidation(RegisterRestaurantSchema, "body"),
            catchErrors(this.controller.handleRestaurantRegistration)
        )
        
        this.router.get(
            "/:restaurantId",
            hapiValidation(FindRestaurantByIdSchema, "params"),
            catchErrors(this.controller.handleGetRestaurantByID)
        );
    }
}