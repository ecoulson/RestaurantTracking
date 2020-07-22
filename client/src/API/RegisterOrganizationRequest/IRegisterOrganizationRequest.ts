import IAddress from "../../Components/AddressInput/IAddress";
import IRequestProps from "../IRequestProps";

export default interface IRegisterOrganizationRequest extends IRequestProps<{}> {
    address: IAddress;
    organizationName: string;
    organizationId: string;
}