export default interface IOrganizationAccountService {
    hasAccount(organizationId: string, email : string) : Promise<boolean>;
}