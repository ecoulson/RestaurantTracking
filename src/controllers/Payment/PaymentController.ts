import IPaymentController from "./IPaymentController";
import IPaymentService from "../../services/Payment/IPaymentService";
import { Request, Response } from "express";
import JSONResponse from "../../lib/HTTP/JSONResponse";

export default class PaymentController implements IPaymentController {
    private paymentService : IPaymentService;

    constructor(paymentService: IPaymentService) {
        this.paymentService = paymentService
    }

    handlePayment() {
        return async (req : Request, res : Response) => {
            return new JSONResponse(res).send({
                paymentIntent: await this.paymentService.handlePayment(req.body.cart)
            })
        }
    }
}