import { RequestHandler } from "express";

export default interface IStripeWebhookController {
    handleWebhook() : RequestHandler;
}