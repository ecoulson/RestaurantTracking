import IUser from "../User/IUser";
import ModelMethods from "../ModelMethods";
import IOrganization from "./IOrganization";
import PermissionSetModel from "../PermissionSet/PermissionSetModel";
import IPermissionSet from "../PermissionSet/IPermissionSet";

export default class OrganizationMethods {
    public static async addStudent(user : IUser) {
        const context = ModelMethods.getContext<IOrganization>(this);
        const organizationPermissionSets : IPermissionSet[] = await OrganizationMethods.queryPermissionSets(context);
        const studentPermissionSet = organizationPermissionSets.filter((permissionSet) => {
            return permissionSet.name === "student";
        })[0];
        await user.addPermissionSet(studentPermissionSet);
        await user.save();
    }

    public static async getPermissionSets() {
        const context = ModelMethods.getContext<IOrganization>(this);
        return await OrganizationMethods.queryPermissionSets(context);
    }

    private static async queryPermissionSets(organization : IOrganization) {
        return await PermissionSetModel.find({
            _id: {
                $in: organization.permissionSets
            }
        })
    }

    public static async addPermissionSet(permissionSet : IPermissionSet) {
        const context = ModelMethods.getContext<IOrganization>(this);
        context.permissionSets.push(permissionSet._id);
        await context.save();
    }
}