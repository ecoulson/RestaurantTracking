import IRequestProps from "../IRequestProps";

export default interface IOrganizationAccountVerificationRequest extends IRequestProps<{}> {
    email: string;
    organizationId: string;
    password: string;
}