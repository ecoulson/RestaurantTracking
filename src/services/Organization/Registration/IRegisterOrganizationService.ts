import IOrganization from "../../../models/Organization/IOrganization";
import IUser from "../../../models/User/IUser";
import IAddress from "../../../models/Organization/IAddress";

export default interface IRegisterOrganizationService {
    registerOrganization(organizationId: string, organizationName: string, address: IAddress, user : IUser) : Promise<IOrganization>;
}