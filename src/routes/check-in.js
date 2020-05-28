const { Response } = require("../lib/HTTP");
const router = require("express").Router();
const { hapiValidation, checkQueryDuplication } = require("../middleware/validation");
const CheckInService = require("../services/check-in");
const { catchErrors } = require("../middleware/error-handling");
const { CheckingInUserSchema, GetCheckinSchema } = require("./check-in.schema");

router.post(
    "/", 
    ensureEmailOrNumberIsProvided,
    hapiValidation(CheckingInUserSchema, "body"),
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

router.get(
    "/", 
    checkQueryDuplication("restaurantId"),  
    hapiValidation(GetCheckinSchema, "query"),
    catchErrors(CheckInService.findRestuarant)
);

module.exports = router;