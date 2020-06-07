import { RequestHandler } from "express";

export default interface IUserController {
    handleRegistration : RequestHandler;
    handleResendVerificationEmail : RequestHandler;
    handleForgotPassword : RequestHandler;
    handleSpamVerification: RequestHandler;
}