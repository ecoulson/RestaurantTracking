import { RequestHandler } from "express";

export default interface IVerificationController {
    handleSpamVerification() : RequestHandler;
    handleVerification() : RequestHandler;
    handleIsVerified() : RequestHandler;
}