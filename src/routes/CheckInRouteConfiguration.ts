import { Response as ResponseHelper } from "../lib/HTTP";
import { Request, Response, NextFunction } from "express";
import { hapiValidation, queryDuplicationMiddleware } from "../middleware/validation";
import * as CheckInService from "../services/check-in";
import { CheckingInUserSchema, GetCheckinSchema } from "./CheckInRouteSchemas";
import RouterConfiguration from "./RouterConfiguration";
import CheckInController from "../controllers/CheckInController";

export default class CheckInRouteConfiguration extends RouterConfiguration<CheckInController> {
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