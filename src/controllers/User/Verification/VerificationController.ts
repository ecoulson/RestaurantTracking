import IVerificationController from "./IVerificationController";
import { RequestHandler, Request, Response } from "express";
import ITokenCallbackQuery from "../ITokenCallback";
import JSONResponse from "../../../lib/HTTP/JSONResponse";
import IUserVerificationService from "../../../services/User/Verification/IUserVerificationService";
import ISpamVerificationService from "../../../services/User/Verification/ISpamVerificationService";
import UserVerificationService from "../../../services/User/Verification/UserVerificationService";
import SpamVerificationService from "../../../services/User/Verification/SpamVerificationService";

export default class VerificationController implements IVerificationController {
    private userVerificationService : IUserVerificationService;
    private spamVerificationService : ISpamVerificationService;

    constructor() {
        this.userVerificationService = new UserVerificationService();
        this.spamVerificationService = new SpamVerificationService();
    }

    handleVerification() : RequestHandler {
        return async (req : Request, res : Response) => {
            const verificationQuery = req.query as unknown as ITokenCallbackQuery;
            await this.userVerificationService.verify(verificationQuery.token, verificationQuery.email);
            return new JSONResponse(res).send({});
        }
    }

    handleSpamVerification() {
        return async (req : Request, res : Response) => {
            const tokenCallbackQuery = req.query as unknown as ITokenCallbackQuery;
            const mailData = await this.spamVerificationService.cancelAccount(
                tokenCallbackQuery.email,
                tokenCallbackQuery.token
            );
            return new JSONResponse(res).send(mailData);
        }
    }
}