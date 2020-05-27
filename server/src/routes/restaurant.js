const router = require("express").Router();
const { validateParams, validateBody } = require("../middleware/validation");
const { catchErrors } = require("../middleware/error-handling");
const RestaurantService = require("../services/restaurant");
const authenticate = require("../middleware/authentication");

const CODE_PROPERTIES = ["restaurantId"];
const FIND_BY_ID_PROPERTIES = ["restaurantId"];
const RESTAURANT_PROPERTIES = ["name", "number"]

router.get(
    "/:restaurantId/generate",
    authenticate,
    validateParams(CODE_PROPERTIES), 
    catchErrors(RestaurantService.generateQRCode)
);

router.post(
    "/register",
    authenticate,
    validateBody(RESTAURANT_PROPERTIES), 
    catchErrors(RestaurantService.registerRestaurant)
);

router.get(
    "/:restaurantId", 
    validateParams(FIND_BY_ID_PROPERTIES), 
    catchErrors(RestaurantService.getRestaurant)
);

module.exports = router;