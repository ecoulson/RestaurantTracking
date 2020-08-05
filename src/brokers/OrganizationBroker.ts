import IOrganization from "../models/Organization/IOrganization";
import OrganizationModel from "../models/Organization/OrganizationModel";
import IUser from "../models/User/IUser";
import UserModel from "../models/User/UserModel";

export default class OrganizationBroker {
    async findOrganizationById(organizationId: string) : Promise<IOrganization> {
        try {
            return await OrganizationModel.findByOrganizationId(organizationId);
        } catch (error) {
            throw error;
        }
    }

    async findUser(organizationId: string, email: string) : Promise<IUser[]> {
        try {
            return await UserModel.find({
                $and: [
                    { organizations: organizationId },
                    { email: email }
                ]
            });
        } catch (error) {
            throw error;
        }
    }

    async save(organization : IOrganization) {
        try {
            return await organization.save();
        } catch (error) {
            throw error;
        }
    }
}