import { Model } from "mongoose";
import IOrganization from "./IOrganization";

export default interface IOrganizationModel extends Model<IOrganization> {
    findByOrganizationId(organizationId: string) : Promise<IOrganization>;
}