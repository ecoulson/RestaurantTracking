import { RequestHandler } from "express";

export default interface IPasswordRecoveryController {
    handlePasswordRecovery() : RequestHandler;
    handlePasswordResetConfirmation() : RequestHandler;
    handlePasswordResetCancelation() : RequestHandler;
}