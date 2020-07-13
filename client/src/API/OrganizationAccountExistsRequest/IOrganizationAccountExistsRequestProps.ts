import IRequestProps from "../IRequestProps";
import IOrganizationAccountExistsResponse from "./IOrganizationAccountExistsResponse";

export default interface IOrganizationAccountExistsRequestProps extends IRequestProps<IOrganizationAccountExistsResponse> {
    email: string;
    organizationId: string;
}