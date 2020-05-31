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
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware";

export default class RestaurantRouteConfiguration extends RouterConfiguration<RestaurantController> {
    constructor() {
        super(new RestaurantController());
    }

    configureRoutes() {
        this.router.get(
            "/:restaurantId/generate",
            new BasicAuthenticationStrategy().authenticate(), 
            new ValidationMiddleware(GenerateQRCodeSchema).validateParams(),
            ErrorCatchingMiddlware.catchErrors(this.controller.handleQRCodeGeneration)
        );
            
        this.router.post(
            "/register",
            new BasicAuthenticationStrategy().authenticate(), 
            new ValidationMiddleware(RegisterRestaurantSchema).validateBody(),
            ErrorCatchingMiddlware.catchErrors(this.controller.handleRestaurantRegistration)
        )
        
        this.router.get(
            "/:restaurantId",
            new ValidationMiddleware(FindRestaurantByIdSchema).validateParams(),
            ErrorCatchingMiddlware.catchErrors(this.controller.handleGetRestaurantByID)
        );
    }
}