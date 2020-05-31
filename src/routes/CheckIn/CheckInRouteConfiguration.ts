import { Request, Response, NextFunction } from "express";
import { hapiValidation } from "../../middleware/validation";
import { CheckingInUserSchema, GetCheckinSchema } from "./CheckInRouteSchemas";
import RouterConfiguration from "../RouterConfiguration";
import CheckInController from "../../controllers/CheckIn/CheckInController";
import ErrorResponse from "../../lib/HTTP/ErrorResponse";
import BasicAuthenticationStrategy from "../../middleware/authentication/BasicAuthenticationStrategy";
import ErrorCatchingMiddlware from "../../middleware/error-handling/ErrorCatchingMiddleware";
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware";

export default class CheckInRouteConfiguration extends RouterConfiguration<CheckInController> {
    constructor() {
        super(new CheckInController());
    }

    configureRoutes() {
        this.router.post(
            "/",
            this.ensureEmailOrNumberIsProvided,
            new ValidationMiddleware(CheckingInUserSchema).validateBody(),
            ErrorCatchingMiddlware.catchErrors(this.controller.handleCheckIn)
        );

        this.router.get(
            "/", 
            new BasicAuthenticationStrategy().authenticate(),  
            new ValidationMiddleware(GetCheckinSchema).validateQuery(),
            ErrorCatchingMiddlware.catchErrors(this.controller.handleGetReport)
        )
    }

    private ensureEmailOrNumberIsProvided(req : Request, res : Response, next : NextFunction) {
        if (!req.body.email && !req.body.number) {
            return new ErrorResponse(res).send({
                error: [
                    "No email or number was provided"
                ]
            })
        }
        return next();
    }
}