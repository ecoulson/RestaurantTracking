import IAddress from "../../../Components/AddressInput/IAddress";

export default interface IOrganizationRegistrationState {
    address: IAddress;
    organizationName: string;
    organizationId: string;
    send: boolean;
}