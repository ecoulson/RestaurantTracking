import IOrganization from "../../../models/Organization/IOrganization";
import IUser from "../../../models/User/IUser";

export default interface IRegisterOrganizationService {
    registerOrganization(organizationId: string, organizationName: string, user : IUser) : Promise<IOrganization>;
}