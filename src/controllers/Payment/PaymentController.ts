import IPaymentController from "./IPaymentController";
import IPaymentService from "../../services/Payment/IPaymentService";
import { Request, Response } from "express";
import JSONResponse from "../../lib/HTTP/JSONResponse";
import ICreateCustomerService from "../../services/Payment/CreateCustomer/ICreateCustomerService";
import ICreateSubscriptionService from "../../services/Payment/CreateSubscription/ICreateSubscriptionService";
import IGetSetupIntentService from "../../services/Payment/SetupIntent/IGetSetupIntentService";
import IUpdatePaymentMethodService from "../../services/Payment/UpdatePaymentMethod/IUpdatePaymentMethodService";

export default class PaymentController implements IPaymentController {
    private paymentService : IPaymentService;
    private createCustomerService : ICreateCustomerService;
    private createSubscriptionService : ICreateSubscriptionService;
    private getSetupIntentService : IGetSetupIntentService;
    private updatePaymentService : IUpdatePaymentMethodService;

    constructor(
        paymentService: IPaymentService, 
        createCustomerService : ICreateCustomerService, 
        createSubscriptionService : ICreateSubscriptionService,
        getSetupIntentService: IGetSetupIntentService,
        updatePaymentService : IUpdatePaymentMethodService
    ) {
        this.paymentService = paymentService
        this.createCustomerService = createCustomerService;
        this.createSubscriptionService = createSubscriptionService;
        this.getSetupIntentService = getSetupIntentService;
        this.updatePaymentService = updatePaymentService;
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
                organization: (await this.createCustomerService.createCustomer(
                    req.body.billingEmail,
                    req.body.organizationId
                ))
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

    handleGetSetupIntent() {
        return async (req : Request, res : Response) => {
            return new JSONResponse(res).send({
                setupIntent: await this.getSetupIntentService.getSetupIntent(
                    req.params.setupIntentId
                )
            })
        }
    }

    handleUpdatePaymentMethod() {
        return async (req : Request, res : Response) => {
            await this.updatePaymentService.updatePaymentMethod(
                req.body.customerId,
                req.body.paymentMethodId
            )
            return new JSONResponse(res).send({})
        }
    }
}