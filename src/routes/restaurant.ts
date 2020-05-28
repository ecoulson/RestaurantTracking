import { Router } from "express";
import { hapiValidation } from "../middleware/validation";
import { catchErrors } from "../middleware/error-handling";
import * as RestaurantService from "../services/restaurant";
import { authenticate } from "../middleware/authentication";
import { 
    GenerateQRCodeSchema, 
    RegisterRestaurantSchema,
    FindRestaurantByIdSchema
} from "./restaurant.schema";

const router = Router();

router.get(
    "/:restaurantId/generate",
    authenticate,
    hapiValidation(GenerateQRCodeSchema, "params"),
    catchErrors(RestaurantService.generateQRCode)
);

router.post(
    "/register",
    authenticate,
    hapiValidation(RegisterRestaurantSchema, "body"),
    catchErrors(RestaurantService.registerRestaurant)
);

router.get(
    "/:restaurantId", 
    hapiValidation(FindRestaurantByIdSchema, "params"),
    catchErrors(RestaurantService.getRestaurant)
);

export default router;