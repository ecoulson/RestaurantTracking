import IUser from "../../../models/User/IUser";

export default interface IRegisterOrganizationAccountService {
    register(params: {
        username: string
        email: string, 
        password: string, 
        organizationId: string,
        firstName: string
        lastName?: string
    }) : Promise<IUser>;
}