import IDocument from "../IDocument";

export default interface IUserSchema extends IDocument {
    username: string;
    profilePicture?: string;
    password: string;
    email: string;
    firstName: string;
    lastName?: string;
    number?: string;
    verified: boolean;
    passwordResetDate: Date;
    permissionSets: string[];
    organizations: string[];
    dateCreated: Date;
    updatedAt: Date;
    anonymous: boolean
}