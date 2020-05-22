const router = require("express").Router();
const { validateQuery, validateBody, checkQueryDuplication } = require("../middleware/validation");
const CheckInController = require("../controllers/check-in");
const { catchErrors } = require("../middleware/error-handling");

const CHECK_IN_PROPERTIES = ["email", "number", "restaurantId"]
router.post(
    "/", 
    validateBody(CHECK_IN_PROPERTIES), 
    catchErrors(CheckInController.checkIn)
);

const GET_CHECK_INS_PROPERTIES = ["restaurantId"]
router.get(
    "/", 
    validateQuery(GET_CHECK_INS_PROPERTIES), 
    checkQueryDuplication("restaurantId"),  
    catchErrors(CheckInController.findRestuarant)
);

module.exports = router;