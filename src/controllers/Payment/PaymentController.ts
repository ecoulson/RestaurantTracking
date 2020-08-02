import IPaymentController from "./IPaymentController";
import IPaymentService from "../../services/Payment/IPaymentService";
import { Request, Response } from "express";
import JSONResponse from "../../lib/HTTP/JSONResponse";
import ICreateCustomerService from "../../services/Payment/CreateCustomer/ICreateCustomerService";
import ICreateSubscriptionService from "../../services/Payment/CreateSubscription/ICreateSubscriptionService";
import IGetSetupIntentService from "../../services/Payment/SetupIntent/IGetSetupIntentService";
import IUpdatePaymentMethodService from "../../services/Payment/UpdatePaymentMethod/IUpdatePaymentMethodService";
import ICancelSubscriptionService from "../../services/Payment/CancelSubscription/ICancelSubscriptionService";
import ICreateInvoiceService from "../../services/Payment/CreateInvoice/ICreateInvoiceService";

export default class PaymentController implements IPaymentController {
    private paymentService : IPaymentService;
    private createCustomerService : ICreateCustomerService;
    private createSubscriptionService : ICreateSubscriptionService;
    private getSetupIntentService : IGetSetupIntentService;
    private updatePaymentService : IUpdatePaymentMethodService;
    private cancelSubscriptionService : ICancelSubscriptionService;
    private createInvoiceService : ICreateInvoiceService;

    constructor(
        paymentService: IPaymentService, 
        createCustomerService : ICreateCustomerService, 
        createSubscriptionService : ICreateSubscriptionService,
        getSetupIntentService: IGetSetupIntentService,
        updatePaymentService : IUpdatePaymentMethodService,
        cancelSubscriptionService : ICancelSubscriptionService,
        createInvoiceService : ICreateInvoiceService
    ) {
        this.paymentService = paymentService
        this.createCustomerService = createCustomerService;
        this.createSubscriptionService = createSubscriptionService;
        this.getSetupIntentService = getSetupIntentService;
        this.updatePaymentService = updatePaymentService;
        this.cancelSubscriptionService = cancelSubscriptionService
        this.createInvoiceService = createInvoiceService;
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
            return new JSONResponse(res).send();
        }
    }

    handleCancelSubscription() {
        return async (req : Request, res : Response) => {
            await this.cancelSubscriptionService.cancelSubscription(req.body.subscriptionId)
            return new JSONResponse(res).send();
        }
    }

    handleCreateInvoice() {
        return async (req : Request, res : Response) => {
            await this.createInvoiceService.createInvoice(
                req.body.customerId,
                req.body.cartItems
            )
            return new JSONResponse(res).send();
        }
    }
}