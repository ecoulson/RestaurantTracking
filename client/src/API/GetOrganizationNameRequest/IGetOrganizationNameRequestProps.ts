import IRequestProps from "../IRequestProps";
import IGetOrganizationNameResponse from "./IGetOrganizationNameResponse";

export default interface IGetOrganizationNameRequestProps extends IRequestProps<IGetOrganizationNameResponse> {
    organizationId: string
}