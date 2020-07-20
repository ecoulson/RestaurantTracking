export default interface IOrganizationAccountExistsService {
    hasAccount(organizationId: string, email : string) : Promise<boolean>;
    isVerified(organizationId: string, email : string) : Promise<boolean>;
}