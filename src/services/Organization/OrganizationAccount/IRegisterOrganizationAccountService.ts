import IUser from "../../../models/user/IUser";

export default interface IRegisterOrganizationAccountService {
    register(email: string, password: string, organizationId: string) : Promise<IUser>;
}