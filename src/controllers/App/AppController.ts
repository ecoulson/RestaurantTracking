import IAppController from "./IAppController";
import { Request, Response } from "express";
import IRegisterAppService from "../../services/App/IRegisterAppService";
import AppType from "../../models/App/AppType";
import JSONResponse from "../../lib/HTTP/JSONResponse";

export default class AppController implements IAppController {
    private registerAppService : IRegisterAppService;

    constructor(registerAppService : IRegisterAppService) {
        this.registerAppService = registerAppService;
    }

    handleRegisterApp() {
        return async (request : Request, response : Response) => {
            await this.registerAppService.register(
                request.body.organizationId, 
                request.body.stripeProductId,
                request.body.stripeSubscriptionId,
                AppType.ContactLogs
            )
            return new JSONResponse(response).send({});
        }
    }
}