export default interface IOrganizationExistsService {
    exists(organizationId: string) : Promise<boolean>;
}