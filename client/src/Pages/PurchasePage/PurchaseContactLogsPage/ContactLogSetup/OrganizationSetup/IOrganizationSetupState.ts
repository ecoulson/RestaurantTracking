import IAddress from "../../../../../Components/AddressInput/IAddress";

export default interface IOrganizationSetupState {
    organizationId: string;
    organizationName: string;
    address: IAddress;
}