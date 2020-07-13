import { model } from "mongoose";
import IOrganization from "./IOrganization";
import IOrganizationModel from "./IOrganizationModel";
import OrganizationSchema from "./OrganizationSchema";

export default model<IOrganization, IOrganizationModel>("Organization", OrganizationSchema)