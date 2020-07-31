import IAddress from "../../Components/AddressInput/IAddress";

export default interface IOrganization {
    _id: string;
    buildings: string[];
    apps: string[];
    stripeId: string;
    organizationId: string;
    organizationName: string;
    address: IAddress;
}