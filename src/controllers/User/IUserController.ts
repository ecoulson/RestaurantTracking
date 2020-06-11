import { RequestHandler } from "express";

export default interface IUserController {
    handleRegistration() : RequestHandler;
    handleResendVerificationEmail() : RequestHandler;
    handlePasswordRecovery() : RequestHandler;
    handleSpamVerification() : RequestHandler;
    handleVerification() : RequestHandler;
    handlePasswordResetConfirmation() : RequestHandler;
    handlePasswordResetCancelation() : RequestHandler;
}