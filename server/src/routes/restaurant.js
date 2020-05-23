const router = require("express").Router();
const { validateParams, validateBody } = require("../middleware/validation");
const { catchErrors } = require("../middleware/error-handling");
const RestaurantController = require("../controllers/restaurant");
const authenticate = require("../middleware/authentication");

const CODE_PROPERTIES = ["restaurantId"];
const FIND_BY_ID_PROPERTIES = ["restaurantId"];
const RESTAURANT_PROPERTIES = ["name", "number"]

router.get(
    "/:restaurantId/generate",
    authenticate,
    validateParams(CODE_PROPERTIES), 
    catchErrors(RestaurantController.generateQRCode)
);

router.post(
    "/register",
    authenticate,
    validateBody(RESTAURANT_PROPERTIES), 
    catchErrors(RestaurantController.registerRestaurant)
);

router.get(
    "/:restaurantId", 
    validateParams(FIND_BY_ID_PROPERTIES), 
    catchErrors(RestaurantController.getRestaurant)
);

module.exports = router;