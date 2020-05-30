import { Response as ResponseHelper } from "../lib/HTTP";
import { Router, Request, Response, NextFunction } from "express";
import { hapiValidation, queryDuplicationMiddleware } from "../middleware/validation";
import * as CheckInService from "../services/check-in";
import { catchErrors } from "../middleware/error-handling";
import { CheckingInUserSchema, GetCheckinSchema } from "./check-in.schema";
import RouterConfiguration from "./RouterConfiguration";
import CheckInController from "../controllers/CheckInController";

export default class CheckInRouterConfiguration extends RouterConfiguration<CheckInController> {
    constructor() {
        super(new CheckInController());
    }

    configureRoutes() {
        this.post("/", [
            this.ensureEmailOrNumberIsProvided,
            hapiValidation(CheckingInUserSchema, "body")
        ], CheckInService.checkIn);

        this.get("/", [
            queryDuplicationMiddleware("restaurantId"),  
            hapiValidation(GetCheckinSchema, "query")
        ], CheckInService.findCheckinsByRestaurant)
    }

    private ensureEmailOrNumberIsProvided(req : Request, res : Response, next : NextFunction) {
        if (!req.body.email && !req.body.number) {
            return ResponseHelper.sendError(res, {
                error: [
                    "No email or number was provided"
                ]
            });
        }
        return next();
    }
}

// const router = Router();

// router.post(
//     "/", 
//     ensureEmailOrNumberIsProvided,
//     hapiValidation(CheckingInUserSchema, "body"),
//     catchErrors(CheckInService.checkIn)
// );

// function 

// router.get(
//     "/", 
//     queryDuplicationMiddleware("restaurantId"),  
//     hapiValidation(GetCheckinSchema, "query"),
//     catchErrors(CheckInService.findCheckinsByRestaurant)
// );

// export default router;