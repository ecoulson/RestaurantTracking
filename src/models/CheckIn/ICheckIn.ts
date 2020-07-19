import ICheckInSchema from "./ICheckInSchema";
import IOrganizationSchema from "../Organization/IOrganizationSchema";
import IUserSchema from "../User/IUserSchema";

export default interface ICheckIn extends ICheckInSchema {
    organizationId: IOrganizationSchema["_id"];
    userId: IUserSchema["_id"];
    serialize() : ICheckIn
}