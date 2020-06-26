import { RequestHandler } from "express";

export default interface IPasswordRecoveryController {
    handlePasswordRecovery() : RequestHandler;
    handlePasswordResetConfirmation() : RequestHandler;
    handlePasswordResetCancellation() : RequestHandler;
    handlePasswordReset() : RequestHandler;
}