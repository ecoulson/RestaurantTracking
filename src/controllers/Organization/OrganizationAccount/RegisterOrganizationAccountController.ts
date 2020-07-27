import IRegisterOrganizationAccountController from "./IRegisterOrganizationAccountController";
import { Request, Response } from "express";
import IRegisterOrganizationAccountService from "../../../services/Organization/OrganizationAccount/IRegisterOrganizationAccountService";
import IVerifyUserService from "../../../services/User/Registration/IVerifyUserService";
import JSONResponse from "../../../lib/HTTP/JSONResponse";
import VerifyOrganizationAccountStrategy from "./VerifyOrganizationAccountStrategy";
import crypto from "crypto";
import UserBroker from "../../../brokers/UserBroker";
import EmailService from "../../../services/Email/EmailService";

export default class RegisterOrganizationAccountController implements IRegisterOrganizationAccountController {
    private registrationService : IRegisterOrganizationAccountService;
    private verifyUserService : IVerifyUserService;

    constructor(registrationService : IRegisterOrganizationAccountService, verifyUserService : IVerifyUserService) {
        this.registrationService = registrationService;
        this.verifyUserService = verifyUserService;
    }

    handleRegistration() {
        return async (request : Request, response : Response) => {
            const user = await this.registrationService.register(
                request.body.email,
                crypto.randomBytes(10).toString("hex"),
                request.params.organizationId
            );
            if (!user.verified) {
                await this.verifyUserService.verify(new VerifyOrganizationAccountStrategy(
                    new UserBroker(),
                    new EmailService(),
                    user.email
                ));
            }
            return new JSONResponse(response).send({});
        }
    }

    handleResendVerification() {
        return async (request : Request, response : Response) => {
            await this.verifyUserService.verify(new VerifyOrganizationAccountStrategy(
                new UserBroker(),
                new EmailService(),
                request.body.email
            ));
            return new JSONResponse(response).send({});
        }
    }
}