const router = require("express").Router();
const { validateParams, validateBody } = require("../middleware/validation");
const { Response } = require("../lib/HTTP");
const Restaurant = require("../models/restaurant");
const { catchErrors } = require("../middleware/error-handling");
const RestaurantController = require("../controllers/restaurant");

const CODE_PROPERTIES = ["restaurantId"];
const FIND_BY_ID_PROPERTIES = ["restaurantId"];
const RESTAURANT_PROPERTIES = ["name", "number"]

router.get(
    "/:restaurantId/generate", 
    validateParams(CODE_PROPERTIES), 
    catchErrors(RestaurantController.generateQRCode)
);

router.post(
    "/register", 
    validateBody(RESTAURANT_PROPERTIES), 
    catchErrors(RestaurantController.registerRestaurant)
);

router.get(
    "/:restaurantId", 
    validateParams(FIND_BY_ID_PROPERTIES), 
    catchErrors(RestaurantController.getRestaurant)
);

module.exports = router;