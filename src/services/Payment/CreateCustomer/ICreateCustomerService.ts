import IUser from "../../../models/User/IUser";

export default interface ICreateCustomerService {
    createCustomer(email: string, user : IUser) : Promise<IUser>;
}