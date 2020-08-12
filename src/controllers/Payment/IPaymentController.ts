import { RequestHandler } from "express";

export default interface IPaymentController {
    handleCreateCustomer() : RequestHandler;
    handleCreateSubscription() : RequestHandler;
    handleGetSetupIntent() : RequestHandler;
    handleUpdatePaymentMethod() : RequestHandler;
    handleCancelSubscription() : RequestHandler;
    handleCreateInvoice() : RequestHandler;
}