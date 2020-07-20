import RequestComponent from "../RequestComponent";
import IOrganizationAccountVerificationRequest from "./IOrganizationAccountVerificationRequest";
import Axios from "axios";

export default class OrganizationAccountVerificationRequest extends RequestComponent<IOrganizationAccountVerificationRequest> {
    getFailureMessage() {
        return "Failed to verify user"
    }

    getSuccessMessage() {
        return "Verified user";
    }

    async onLoad() {
        return (await Axios.post(`/api/organization/account/${this.props.organizationId}/verify`, {
            email: this.props.email,
            password: this.props.password
        })).data
    }
}