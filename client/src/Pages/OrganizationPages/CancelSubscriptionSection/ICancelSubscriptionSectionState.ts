import IOrganization from "../../../API/GetOrganizationRequest/IOrganization";
import IApp from "../../../lib/IApp";

export default interface ICancelSubscriptionSectionState {
    organization: IOrganization | null;
    shouldCancelSubscription: boolean;
    shouldGetApp: boolean;
    app: IApp | null;
}