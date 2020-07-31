import IAddress from "../../Components/AddressInput/IAddress";
import IRequestProps from "../IRequestProps";
import IRegisterOrganizationResponse from "./IRegisterOrganizationResponse";

export default interface IRegisterOrganizationRequest extends IRequestProps<IRegisterOrganizationResponse> {
    address: IAddress;
    organizationName: string;
    organizationId: string;
}