import IOrganization from "../../../models/Organization/IOrganization";

export default interface ICreateCustomerService {
    createCustomer(email: string, organzationId: string) : Promise<IOrganization>;
}