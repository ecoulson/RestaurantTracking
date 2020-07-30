import { RequestHandler } from "express";

export default interface IPaymentController {
    handlePayment() : RequestHandler;
}