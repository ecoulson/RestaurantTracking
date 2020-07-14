import IRegisterOrganizationAccountController from "./IRegisterOrganizationAccountController";
import { Request, Response } from "express";
import IRegisterOrganizationAccountService from "../../../services/Organization/OrganizationAccount/IRegisterOrganizationAccountService";
import IVerifyUserService from "../../../services/User/Registration/IVerifyUserService";
import JSONResponse from "../../../lib/HTTP/JSONResponse";

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
                request.body.password,
                request.params.organizationId
            );
            const values = new Map<string, string>();
            values.set("organizationId", request.params.organizationId);
            await this.verifyUserService.verify(user.email, values);
            return new JSONResponse(response).send({});
        }
    }

    handleResendVerification() {
        return async (request : Request, response : Response) => {
            const values = new Map<string, string>();
            values.set("organizationId", request.params.organizationId);
            await this.verifyUserService.verify(request.body.email, values);
            return new JSONResponse(response).send({});
        }
    }
}