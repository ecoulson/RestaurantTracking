import IApp from "../../models/App/IApp";
import AppType from "../../models/App/AppType";

export default interface IRegisterAppService {
    register(
        organizationId : string, 
        stripeProductId: string,
        stripeSubscriptionId: string,
        type : AppType
    ) : Promise<IApp>
}