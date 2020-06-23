import { RequestHandler } from "express";

export default interface IUserRegistrationController {
    handleRegistration() : RequestHandler;
    handleResendVerificationEmail() : RequestHandler;
    handleUsernameAvailibilty() : RequestHandler;
}