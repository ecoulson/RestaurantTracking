import { RequestHandler } from "express";

export default interface IRegisterOrganizationAccountController {
    handleRegistration() : RequestHandler;
    handleResendVerification() : RequestHandler;
    handleAnonymousRegistration() : RequestHandler;
}