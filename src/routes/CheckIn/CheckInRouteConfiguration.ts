import { Response as ResponseHelper } from "../../lib/HTTP";
import { Request, Response, NextFunction } from "express";
import { hapiValidation, queryDuplicationMiddleware } from "../../middleware/validation";
import { CheckingInUserSchema, GetCheckinSchema } from "./CheckInRouteSchemas";
import RouterConfiguration from "../RouterConfiguration";
import CheckInController from "../../controllers/CheckIn/CheckInController";
import { authenticate } from "../../middleware/authentication";

export default class CheckInRouteConfiguration extends RouterConfiguration<CheckInController> {
    constructor() {
        super(new CheckInController());
    }

    configureRoutes() {
        this.post("/", [
            this.ensureEmailOrNumberIsProvided,
            hapiValidation(CheckingInUserSchema, "body")
        ], this.controller.handleCheckin);

        this.get("/", [
            authenticate,
            queryDuplicationMiddleware("restaurantId"),  
            hapiValidation(GetCheckinSchema, "query")
        ], this.controller.handleGetCheckins)
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