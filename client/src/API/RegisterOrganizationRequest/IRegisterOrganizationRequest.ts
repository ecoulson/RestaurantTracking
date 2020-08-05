import IAddress from "../../Components/AddressInput/IAddress";
import IRequestProps from "../IRequestProps";
import IRegisterOrganizationResponse from "./IRegisterOrganizationResponse";

export default interface IRegisterOrganizationRequest extends IRequestProps<IRegisterOrganizationResponse> {
    address: IAddress | null;
    organizationName: string;
    organizationId: string;
}