import IGetAppService from "./IGetAppService";
import AppBroker from "../../brokers/AppBroker";

export default class GetAppService implements IGetAppService {
    private appBroker : AppBroker;

    constructor(appBroker : AppBroker) {
        this.appBroker = appBroker
    }

    async getApp(id: string) {
        return await this.appBroker.findById(id);
    }
}