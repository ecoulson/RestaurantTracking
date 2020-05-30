import { Response } from "../lib/HTTP";
import { Router } from "express";
import { hapiValidation, queryDuplicationMiddleware } from "../middleware/validation";
import * as CheckInService from "../services/check-in";
import { catchErrors } from "../middleware/error-handling";
import { CheckingInUserSchema, GetCheckinSchema } from "./check-in.schema";

const router = Router();

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
    queryDuplicationMiddleware("restaurantId"),  
    hapiValidation(GetCheckinSchema, "query"),
    catchErrors(CheckInService.findCheckinsByRestaurant)
);

export default router;