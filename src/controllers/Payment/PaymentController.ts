import IPaymentController from "./IPaymentController";
import IPaymentService from "../../services/Payment/IPaymentService";
import { Request, Response } from "express";
import JSONResponse from "../../lib/HTTP/JSONResponse";
import ICreateCustomerService from "../../services/Payment/CreateCustomer/ICreateCustomerService";
import ICreateSubscriptionService from "../../services/Payment/CreateSubscription/ICreateSubscriptionService";

export default class PaymentController implements IPaymentController {
    private paymentService : IPaymentService;
    private createCustomerService : ICreateCustomerService;
    private createSubscriptionService : ICreateSubscriptionService;

    constructor(paymentService: IPaymentService, createCustomerService : ICreateCustomerService, createSubscriptionService : ICreateSubscriptionService) {
        this.paymentService = paymentService
        this.createCustomerService = createCustomerService;
        this.createSubscriptionService = createSubscriptionService;
    }

    handlePayment() {
        return async (req : Request, res : Response) => {
            return new JSONResponse(res).send({
                paymentIntent: await this.paymentService.handlePayment(req.body.cart)
            })
        }
    }

    handleCreateCustomer() {
        return async (req : Request, res : Response) => {
            return new JSONResponse(res).send({
                user: (await this.createCustomerService.createCustomer(
                    req.body.billingEmail,
                    req.user
                )).serialize()
            })
        }
    }

    handleCreateSubscription() {
        return async (req : Request, res : Response) => {
            return new JSONResponse(res).send({
                subscription: await this.createSubscriptionService.createSubscription(
                    req.body.paymentMethodId,
                    req.body.customerId,
                    req.body.priceIds
                )
            })
        }
    }
}