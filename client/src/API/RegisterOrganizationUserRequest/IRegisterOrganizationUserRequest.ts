import IRequestProps from "../IRequestProps";

export default interface IRegisterOrganizationUserRequest extends IRequestProps<{}> {
    organizationId: string;
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName?: string;
}