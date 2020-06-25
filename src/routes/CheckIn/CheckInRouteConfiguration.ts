import { Request, Response, NextFunction } from "express";
import { CheckingInUserSchema, GetCheckinSchema } from "./CheckInRouteSchemas";
import RouterConfiguration from "../RouterConfiguration";
import CheckInController from "../../controllers/CheckIn/CheckInController";
import ErrorResponse from "../../lib/HTTP/ErrorResponse";
import BasicAuthenticationStrategy from "../../middleware/authentication/BasicAuthenticationStrategy";
import ErrorCatchingMiddleware from "../../middleware/error-handling/ErrorCatchingMiddleware";
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware";

export default class CheckInRouteConfiguration extends RouterConfiguration {
    private controller : CheckInController;

    constructor() {
        super();
        this.controller = new CheckInController();
    }

    configureRoutes() {
        this.router.post(
            "/",
            this.ensureEmailOrNumberIsProvided,
            new ValidationMiddleware(CheckingInUserSchema).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleCheckIn)
        );

        this.router.get(
            "/", 
            new BasicAuthenticationStrategy().authenticate(),  
            new ValidationMiddleware(GetCheckinSchema).validateQuery(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleGetReport)
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