import IRequestProps from "../IRequestProps";

export default interface IRegisterOrganizationUserRequest extends IRequestProps<{}> {
    organizationId: string;
    email: string;
}