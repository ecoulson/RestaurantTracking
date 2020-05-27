const router = require("express").Router();
const { hapiValidation } = require("../middleware/validation");
const { catchErrors } = require("../middleware/error-handling");
const RestaurantService = require("../services/restaurant");
const authenticate = require("../middleware/authentication");
const { 
    GenerateQRCodeSchema, 
    RegisterRestaurantSchema,
    FindRestaurantByIdSchema
} = require("./restaurant.schema");

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

module.exports = router;