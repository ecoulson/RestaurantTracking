import { Request, Response, RequestHandler } from "express";
import JSONResponse from "../../lib/HTTP/JSONResponse";
import IUserController from "./IUserController";
import IRegistrationBody from "./IRegistrationBody";
import ITokenCallbackQuery from "./ITokenCallback";
import IUserRegistrationService from "../../services/User/IUserRegistrationService";
import UserRegistrationService from "../../services/User/UserRegistrationService";
import IVerificationEmailService from "../../services/User/IVerificationEmailService";
import VerificationEmailService from "../../services/User/VerificationEmailService";
import IUserVerificationService from "../../services/User/IUserVerificationService";
import UserVerificationService from "../../services/User/UserVerificationService";
import ISpamVerificationService from "../../services/User/ISpamVerificationService";
import SpamVerificationService from "../../services/User/SpamVerificationService";
import IPasswordRecoveryService from "../../services/User/IPasswordRecoveryService";
import PasswordRecoveryService from "../../services/User/PasswordRecoveryService";
import IPasswordRecoveryConfirmationService from "../../services/User/IPasswordRecoveryConfirmationService";
import PasswordRecoveryConfirmationService from "../../services/User/PasswordRecoveryConfirmationService";
import IPasswordResetBody from "./IPasswordResetBody";
import IPasswordResetService from "../../services/User/IPasswordResetService";
import PasswordResetService from "../../services/User/PasswordResetService";
import ICancelPasswordRecoveryService from "../../services/User/ICancelPasswordRecoveryService";
import CancelPasswordRecoveryService from "../../services/User/CancelPasswordRecoveryService";

export default class UserController implements IUserController {
    private userRegistrationService : IUserRegistrationService;
    private verificationEmailService : IVerificationEmailService;
    private userVerificationService : IUserVerificationService;
    private spamVerificationService : ISpamVerificationService;
    private passwordRecoveryService : IPasswordRecoveryService;
    private passwordRecoveryConfirmationService : IPasswordRecoveryConfirmationService;
    private passwordResetService : IPasswordResetService;
    private cancelPasswordResetService : ICancelPasswordRecoveryService;

    constructor() {
        this.userRegistrationService = new UserRegistrationService();
        this.verificationEmailService = new VerificationEmailService();
        this.userVerificationService = new UserVerificationService();
        this.spamVerificationService = new SpamVerificationService();
        this.passwordRecoveryService = new PasswordRecoveryService();
        this.passwordRecoveryConfirmationService = new PasswordRecoveryConfirmationService();
        this.passwordResetService = new PasswordResetService();
        this.cancelPasswordResetService = new CancelPasswordRecoveryService();
    }
    
    handleRegistration() : RequestHandler {
        return async (req : Request, res : Response) => {
            const registration = req.body as IRegistrationBody;
            const user = await this.userRegistrationService.register(registration);
            await this.verificationEmailService.sendVerificationEmail(user.email);
            return new JSONResponse(res).send(user);
        }
    }

    handleVerification() : RequestHandler {
        return async (req : Request, res : Response) => {
            const verificationQuery = req.query as unknown as ITokenCallbackQuery;
            await this.userVerificationService.verify(verificationQuery.token, verificationQuery.email);
            return new JSONResponse(res).send({});
        }
    }

    handleResendVerificationEmail() {
        return async (req : Request, res : Response) => {
            if (req.user.verified) {
                throw new Error(`User ${req.user.username} is already verified`);
            }
            const mailData = await this.verificationEmailService.sendVerificationEmail(req.user.email);
            return new JSONResponse(res).send(mailData);
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
    
    handlePasswordRecovery() {
        return async (req : Request, res : Response) => {
            const mailData = await this.passwordRecoveryService.sendForgotPasswordEmail(
                req.body.email
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

    handlePasswordResetCancelation() {
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