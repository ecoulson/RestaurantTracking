import IRequestProps from "../IRequestProps";
import IHasOrganizationAccountResponse from "./IHasOrganizationAccountResponse";

export default interface IHasOrganizationAccountRequestProps extends IRequestProps<IHasOrganizationAccountResponse> {
    email: string;
    organizationId: string;
}