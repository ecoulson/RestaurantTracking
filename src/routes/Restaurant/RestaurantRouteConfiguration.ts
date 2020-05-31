import { hapiValidation } from "../../middleware/validation";
import { 
    GenerateQRCodeSchema, 
    RegisterRestaurantSchema,
    FindRestaurantByIdSchema
} from "./RestaurantRouteSchemas";
import RouterConfiguration from "../RouterConfiguration";
import RestaurantController from "../../controllers/Restaurant/RestaurantController";
import BasicAuthenticationStrategy from "../../middleware/authentication/BasicAuthenticationStrategy";
import ErrorCatchingMiddlware from "../../middleware/error-handling/ErrorCatchingMiddleware";

export default class RestaurantRouteConfiguration extends RouterConfiguration<RestaurantController> {
    constructor() {
        super(new RestaurantController());
    }

    configureRoutes() {
        this.router.get(
            "/:restaurantId/generate",
            new BasicAuthenticationStrategy().authenticate, 
            hapiValidation(GenerateQRCodeSchema, "params"), 
            ErrorCatchingMiddlware.catchErrors(this.controller.handleQRCodeGeneration)
        );
            
        this.router.post(
            "/register",
            new BasicAuthenticationStrategy().authenticate, 
            hapiValidation(RegisterRestaurantSchema, "body"),
            ErrorCatchingMiddlware.catchErrors(this.controller.handleRestaurantRegistration)
        )
        
        this.router.get(
            "/:restaurantId",
            hapiValidation(FindRestaurantByIdSchema, "params"),
            ErrorCatchingMiddlware.catchErrors(this.controller.handleGetRestaurantByID)
        );
    }
}