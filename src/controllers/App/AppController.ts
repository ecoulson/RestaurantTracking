import IAppController from "./IAppController";
import { Request, Response } from "express";
import IRegisterAppService from "../../services/App/IRegisterAppService";
import AppType from "../../models/App/AppType";
import JSONResponse from "../../lib/HTTP/JSONResponse";
import IGetAppService from "../../services/App/IGetAppService";

export default class AppController implements IAppController {
    private registerAppService : IRegisterAppService;
    private getAppService : IGetAppService;

    constructor(registerAppService : IRegisterAppService, getAppService : IGetAppService) {
        this.registerAppService = registerAppService;
        this.getAppService = getAppService
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

    handleGetApp() {
        return async (request : Request, response : Response) => {
            return new JSONResponse(response).send(await this.getAppService.getApp(request.params.id));
        }
    }
}