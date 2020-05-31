import { Response as ResponseHelper } from "../../lib/HTTP";
import { Request, Response, NextFunction } from "express";
import { hapiValidation, queryDuplicationMiddleware } from "../../middleware/validation";
import { CheckingInUserSchema, GetCheckinSchema } from "./CheckInRouteSchemas";
import RouterConfiguration from "../RouterConfiguration";
import CheckInController from "../../controllers/CheckIn/CheckInController";
import { authenticate } from "../../middleware/authentication";
import { logger } from "../../lib/logging";
import { catchErrors } from "../../middleware/error-handling";

export default class CheckInRouteConfiguration extends RouterConfiguration<CheckInController> {
    constructor() {
        super(new CheckInController());
    }

    configureRoutes() {
        this.router.post(
            "/",
            this.ensureEmailOrNumberIsProvided,
            hapiValidation(CheckingInUserSchema, "body"), 
            catchErrors(this.controller.handleCheckin)
        );

        this.router.get(
            "/", 
            authenticate,
            queryDuplicationMiddleware("restaurantId"),  
            hapiValidation(GetCheckinSchema, "query"), 
            catchErrors(this.controller.handleGetCheckins)
        )
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