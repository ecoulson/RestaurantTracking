import IAddress from "../../Components/AddressInput/IAddress";

export default interface IRegisterOrganizationResponse {
    organization: {
        permissionSets: string[],
        buildings: string[],
        apps: string[],
        organizationId: string;
        organizationName: string;
        address: IAddress;
    }
}