import IBillingPlanController from "./IBillingPlanController";
import { Request, Response } from "express";
import JSONResponse from "../../lib/HTTP/JSONResponse";
import IGetBillingPlanService from "../../services/BillingPlan/IGetBillingPlanService";
import AppType from "../../models/App/AppType";

export default class BillingPlanController implements IBillingPlanController {
    private getBillingPlanService : IGetBillingPlanService;

    constructor(getBillingPlanService : IGetBillingPlanService) {
        this.getBillingPlanService = getBillingPlanService;
    }

    handleGetBillingPlan() {
        return async (request : Request, response : Response) => {
            return new JSONResponse(response).send(
                await this.getBillingPlanService.getBillingPlan(
                    AppType[request.params.type as keyof typeof AppType]
                )
            )
        }
    }
}