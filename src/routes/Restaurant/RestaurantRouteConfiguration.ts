import { 
    GenerateQRCodeSchema, 
    RegisterRestaurantSchema,
    FindRestaurantByIdSchema
} from "./RestaurantRouteSchemas";
import RouterConfiguration from "../RouterConfiguration";
import RestaurantController from "../../controllers/Restaurant/RestaurantController";
import BasicAuthenticationStrategy from "../../middleware/Authentication/BasicAuthenticationStrategy";
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware";
import ValidationMiddleware from "../../middleware/Validation/ValidationMiddleware";

export default class RestaurantRouteConfiguration extends RouterConfiguration {
    private controller : RestaurantController;

    constructor() {
        super();
        this.controller = new RestaurantController();
    }

    configureRoutes() {
        this.router.get(
            "/:restaurantId/generate",
            new BasicAuthenticationStrategy().authenticate(), 
            new ValidationMiddleware(GenerateQRCodeSchema).validateParams(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleQRCodeGeneration)
        );
            
        this.router.post(
            "/register",
            new BasicAuthenticationStrategy().authenticate(), 
            new ValidationMiddleware(RegisterRestaurantSchema).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleRestaurantRegistration)
        )
        
        this.router.get(
            "/:restaurantId",
            new ValidationMiddleware(FindRestaurantByIdSchema).validateParams(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleGetRestaurantByID)
        );

        this.router.get(
            "/",
            ErrorCatchingMiddleware.catchErrors(this.controller.handleGetAllRestaurants)
        )
    }
}