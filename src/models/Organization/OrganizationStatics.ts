import IOrganizationModel from "./IOrganizationModel";
import ModelStatics from "../ModelStatics";

export default class OrganizationStatics {
    public static async findByOrganizationId(organizationId : string) {
        const context : IOrganizationModel = ModelStatics.getContext<IOrganizationModel>(this);
        return await context.findOne({ organizationId });
    }
}