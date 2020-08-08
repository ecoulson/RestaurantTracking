import IGetAppService from "./IGetAppService";
import AppBroker from "../../brokers/AppBroker";

export default class GetAppService implements IGetAppService {
    private appBroker : AppBroker;

    constructor(appBroker : AppBroker) {
        this.appBroker = appBroker
    }

    async getApp(id: string) {
        const app = await this.appBroker.findById(id);
        if (!app) {
            throw new Error(`No app with id: ${id}`)
        }
        return app;
    }
}