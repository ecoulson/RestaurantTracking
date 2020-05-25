const { Response } = require("../lib/HTTP");
const router = require("express").Router();
const { validateQuery, validateBody, checkQueryDuplication } = require("../middleware/validation");
const CheckInController = require("../services/check-in");
const { catchErrors } = require("../middleware/error-handling");

const CHECK_IN_PROPERTIES = ["restaurantId"]
router.post(
    "/", 
    validateBody(CHECK_IN_PROPERTIES), 
    validateOptions,
    catchErrors(CheckInController.checkIn)
);

function validateOptions(req, res, next) {
    if (!req.body.email && !req.body.number) {
        return Response.sendError(res, {
            error: "No email or number was provided"
        });
    }
    return next();
}

const GET_CHECK_INS_PROPERTIES = ["restaurantId"]
router.get(
    "/", 
    validateQuery(GET_CHECK_INS_PROPERTIES), 
    checkQueryDuplication("restaurantId"),  
    catchErrors(CheckInController.findRestuarant)
);

module.exports = router;