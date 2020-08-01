import { RequestHandler } from "express";

export default interface IBillingPlanController {
    handleGetBillingPlan() : RequestHandler;
}