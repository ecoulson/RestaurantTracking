import IGetSetupIntentService from "./IGetSetupIntentService";
import StripeBroker from "../../../brokers/StripeBroker";

export default class GetSetupIntentService implements IGetSetupIntentService {
    private stripeBroker : StripeBroker;

    constructor(stripeBroker : StripeBroker) {
        this.stripeBroker = stripeBroker;
    }

    async getSetupIntent(setupIntentId: string) {
        return await this.stripeBroker.getSetupIntent(setupIntentId);
    }
}