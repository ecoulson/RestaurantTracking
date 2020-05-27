const { Response } = require("../lib/HTTP");
const router = require("express").Router();
const { validateQuery, validateBody, checkQueryDuplication } = require("../middleware/validation");
const CheckInService = require("../services/check-in");
const { catchErrors } = require("../middleware/error-handling");
const { CheckingInUserSchema } = require("./check-in.schema");

router.post(
    "/", 
    ensureEmailOrNumberIsProvided,
    hapiValidation,
    catchErrors(CheckInService.checkIn)
);

function ensureEmailOrNumberIsProvided(req, res, next) {
    if (!req.body.email && !req.body.number) {
        return Response.sendError(res, {
            error: [
                "No email or number was provided"
            ]
        });
    }
    return next();
}

function hapiValidation(req, res, next) {
    const validationResult = CheckingInUserSchema.validate(req.body);
    if (validationResult.error) {
        return Response.sendError(res, {
            error: getErrors(validationResult.error)
        })
    }
    return next();
}

function getErrors(errors) {
    return errors.details.map((error) => {
        return error.message;
    })
}

const GET_CHECK_INS_PROPERTIES = ["restaurantId"]
router.get(
    "/", 
    checkQueryDuplication("restaurantId"),  
    validateQuery(GET_CHECK_INS_PROPERTIES), 
    catchErrors(CheckInService.findRestuarant)
);

module.exports = router;