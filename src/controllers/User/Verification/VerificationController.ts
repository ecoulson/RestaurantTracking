import IVerificationController from "./IVerificationController";
import { RequestHandler, Request, Response } from "express";
import ITokenCallbackQuery from "../ITokenCallback";
import JSONResponse from "../../../lib/HTTP/JSONResponse";
import IUserVerificationService from "../../../services/User/Verification/IUserVerificationService";
import ISpamVerificationService from "../../../services/User/Verification/ISpamVerificationService";
import UserVerificationStrategy from "../../../services/User/Verification/UserVerificationStrategy";
import UserBroker from "../../../brokers/UserBroker";
import TokenBroker from "../../../brokers/TokenBroker";

export default class VerificationController implements IVerificationController {
    private userVerificationService : IUserVerificationService;
    private spamVerificationService : ISpamVerificationService;
    private userBroker : UserBroker;
    private tokenBroker : TokenBroker;

    constructor(
        userBroker : UserBroker, 
        tokenBroker : TokenBroker, 
        userVerificationService : IUserVerificationService, 
        spamVerificationService : ISpamVerificationService
    ) {
        this.userVerificationService = userVerificationService;
        this.spamVerificationService = spamVerificationService
        this.userBroker = userBroker;
        this.tokenBroker = tokenBroker;
    }

    handleVerification() : RequestHandler {
        return async (req : Request, res : Response) => {
            const verificationQuery = req.query as unknown as ITokenCallbackQuery;
            const verificationStrategy = new UserVerificationStrategy(
                this.userBroker, 
                this.tokenBroker, 
                verificationQuery.token,
                verificationQuery.email 
            );
            await this.userVerificationService.verify(verificationStrategy);
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

    handleIsVerified() {
        return async (req : Request, res : Response) => {
            return new JSONResponse(res).send({
                verified: req.user.verified,
                anonymous: req.user.anonymous
            })
        }
    }
}