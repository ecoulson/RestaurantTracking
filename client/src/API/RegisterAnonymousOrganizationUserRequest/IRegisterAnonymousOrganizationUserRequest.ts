import IRequestProps from "../IRequestProps";
import IRegisterAnonymousOrganizationUserResponse from "./IRegisterAnonymousOrganizationUserResponse";

export default interface IRegisterAnonymousOrganizationUserRequest extends IRequestProps<IRegisterAnonymousOrganizationUserResponse> {
    organizationId: string;
}