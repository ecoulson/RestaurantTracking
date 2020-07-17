import IUser from "../../../models/User/IUser";

export default interface IRegisterOrganizationAccountService {
    register(email: string, password: string, organizationId: string) : Promise<IUser>;
}