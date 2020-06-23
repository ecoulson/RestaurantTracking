import IDocument from "../IDocument";

export default interface IUserSchema extends IDocument {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    verified: boolean;
    passwordResetDate: Date;
    dateCreated: Date;
    updatedAt: Date;
}