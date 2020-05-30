import { hapiValidation } from "../../middleware/validation";
import { catchErrors } from "../../middleware/error-handling";
import * as RestaurantService from "../../services/restaurant";
import { authenticate } from "../../middleware/authentication";
import { 
    GenerateQRCodeSchema, 
    RegisterRestaurantSchema,
    FindRestaurantByIdSchema
} from "./RestaurantRouteSchemas";
import RouterConfiguration from "../RouterConfiguration";
import RestaurantController from "../../controllers/RestaurantController";

export default class RestaurantRouteConfiguration extends RouterConfiguration<RestaurantController> {
    constructor() {
        super(new RestaurantController());
    }

    configureRoutes() {
        this.get(
            "/:restaurantId/generate",
            [ authenticate, hapiValidation(GenerateQRCodeSchema, "params")], 
            RestaurantService.generateQRCode
        );

        this.post(
            "/register",
            [authenticate, hapiValidation(RegisterRestaurantSchema, "body")],
            RestaurantService.registerRestaurant
        )

        this.get(
            "/:restaurantId",
            [ hapiValidation(FindRestaurantByIdSchema, "params"), catchErrors(RestaurantService.getRestaurant)],
            RestaurantService.getRestaurant
        )
    }
}