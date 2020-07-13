export default interface IOrganizationAccountExistsService {
    hasAccount(organizationId: string, email : string) : Promise<boolean>;
}