import IAppController from "./IAppController";
import { Request, Response } from "express";
import IRegisterAppService from "../../services/App/IRegisterAppService";
import AppType from "../../models/App/AppType";
import JSONResponse from "../../lib/HTTP/JSONResponse";
import IGetAppService from "../../services/App/IGetAppService";
import IAppIsActiveService from "../../services/App/IAppIsActiveService";

export default class AppController implements IAppController {
    private registerAppService : IRegisterAppService;
    private getAppService : IGetAppService;
    private appIsActiveService : IAppIsActiveService;

    constructor(registerAppService : IRegisterAppService, getAppService : IGetAppService, appIsActiveService : IAppIsActiveService) {
        this.registerAppService = registerAppService;
        this.getAppService = getAppService;
        this.appIsActiveService = appIsActiveService;
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

    handleAppIsActive() {
        return async (request : Request, response : Response) => {
            return new JSONResponse(response).send(await this.appIsActiveService.isActive(
                AppType[request.params.type as keyof typeof AppType],
                request.params.organizationId
            ));
        }
    }
}