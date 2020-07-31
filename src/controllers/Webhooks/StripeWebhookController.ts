import IStripeWebhookController from "./IStripeWebhookController";
import { Request, Response } from "express";
import StripeBroker from "../../brokers/StripeBroker";
import IStripeWebhookService from "../../services/Webhooks/IStripeWebhookService";
import MessageResponse from "../../lib/HTTP/MessageResponse";

export default class StripeWebhookController implements IStripeWebhookController {
    private stripeBroker : StripeBroker;
    private stripeWebhookService : IStripeWebhookService;

    constructor(stripeBroker : StripeBroker, stripeWebhookService : IStripeWebhookService) {
        this.stripeBroker = stripeBroker;
        this.stripeWebhookService = stripeWebhookService
    }

    handleWebhook() {
        return async (request : Request, response: Response) => {
            const event = this.stripeBroker.constructWebhookEvent(request);
            this.stripeWebhookService.handleEvent(event);
            return new MessageResponse(response).send("");
        }
    }
}