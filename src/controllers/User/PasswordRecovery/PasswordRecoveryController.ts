import IPasswordRecoveryController from "./IPasswordRecoveryController";
import JSONResponse from "../../../lib/HTTP/JSONResponse";
import PasswordResetService from "../../../services/User/PasswordRecovery/PasswordResetService";
import CancelPasswordRecoveryService from "../../../services/User/PasswordRecovery/CancelPasswordRecoveryService";
import PasswordRecoveryConfirmationService from "../../../services/User/PasswordRecovery/PasswordRecoveryConfirmationService";
import IPasswordRecoveryService from "../../../services/User/PasswordRecovery/IPasswordRecoveryService";
import IPasswordRecoveryConfirmationService from "../../../services/User/PasswordRecovery/IPasswordRecoveryConfirmationService";
import IPasswordResetService from "../../../services/User/PasswordRecovery/IPasswordResetService";
import ICancelPasswordRecoveryService from "../../../services/User/PasswordRecovery/ICancelPasswordRecoveryService";
import { Request, Response } from "express";
import ITokenCallbackQuery from "../ITokenCallback";
import IPasswordResetBody from "./IPasswordResetBody";
import UserBroker from "../../../brokers/UserBroker";
import TokenBroker from "../../../brokers/TokenBroker";

export default class PasswordRecoveryController implements IPasswordRecoveryController {
    private passwordRecoveryService : IPasswordRecoveryService;
    private passwordRecoveryConfirmationService : IPasswordRecoveryConfirmationService;
    private passwordResetService : IPasswordResetService;
    private cancelPasswordResetService : ICancelPasswordRecoveryService;

    constructor(passwordRecoveryService : IPasswordRecoveryService) {
        this.passwordRecoveryService = passwordRecoveryService;
        this.passwordRecoveryConfirmationService = new PasswordRecoveryConfirmationService();
        this.passwordResetService = new PasswordResetService(
            new UserBroker(),
            new TokenBroker()
        );
        this.cancelPasswordResetService = new CancelPasswordRecoveryService();
    }
    
    handlePasswordRecovery() {
        return async (req : Request, res : Response) => {
            const mailData = await this.passwordRecoveryService.sendForgotPasswordEmail(
                req.body.email,
                req.tokenValues ? req.tokenValues : new Map<string, string>()
            );
            return new JSONResponse(res).send(mailData);
        }
    }

    handlePasswordResetConfirmation() {
        return async (req : Request, res : Response) => {
            const tokenCallbackQuery = req.query as unknown as ITokenCallbackQuery;
            const confirmed = await this.passwordRecoveryConfirmationService.confirm(
                tokenCallbackQuery.email,
                tokenCallbackQuery.token
            );
            return new JSONResponse(res).send(confirmed);
        }
    }

    handlePasswordReset() {
        return async (req : Request, res : Response) => {
            const resetBody = req.body as IPasswordResetBody;
            const user = await this.passwordResetService.reset(
                resetBody.email,
                resetBody.password,
                resetBody.token
            );
            return new JSONResponse(res).send(user);
        }
    }

    handlePasswordResetCancellation() {
        return async (req : Request, res : Response) => {
            const tokenCallbackQuery = req.query as unknown as ITokenCallbackQuery;
            const canceled = await this.cancelPasswordResetService.cancel(
                tokenCallbackQuery.email, 
                tokenCallbackQuery.token
            );
            return new JSONResponse(res).send(canceled);
        }
    }
}