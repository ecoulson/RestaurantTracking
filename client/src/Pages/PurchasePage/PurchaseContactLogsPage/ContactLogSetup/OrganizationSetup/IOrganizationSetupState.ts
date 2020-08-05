import IAddress from "../../../../../Components/AddressInput/IAddress";
import ICreditCard from "../../../../../lib/ICreditCard";

export default interface IOrganizationSetupState {
    organizationId: string;
    organizationName: string;
    address: IAddress;
}