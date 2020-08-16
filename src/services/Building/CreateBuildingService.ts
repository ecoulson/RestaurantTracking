import ICreateBuildingService from "./ICreateBuildingService";
import BuildingType from "../../models/Building/BuildingType";
import BuildingBroker from "../../brokers/BuildingBroker";
import OrganizationBroker from "../../brokers/OrganizationBroker";

export default class CreateBuildingService implements ICreateBuildingService {
    private buildingBroker : BuildingBroker;
    private organizationBroker : OrganizationBroker;

    constructor(buildingBroker : BuildingBroker, organizationBroker : OrganizationBroker) {
        this.buildingBroker = buildingBroker;
        this.organizationBroker = organizationBroker;
    }

    async create(name: string, organizationId: string, type: BuildingType) {
        const organization = 
            await this.organizationBroker.findOrganizationById(organizationId)
        if (!organization) {
            throw new Error(`No organization with id: ${organizationId}`)
        }
        organization.buildings.push(name);
        await this.organizationBroker.save(organization);
        return await this.buildingBroker.create(
            name,
            organizationId,
            type
        )
    }
}