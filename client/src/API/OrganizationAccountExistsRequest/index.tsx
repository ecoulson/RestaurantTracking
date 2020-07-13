import RequestComponent from "../RequestComponent";
import IOrganizationAccountExistsRequestProps from "./IOrganizationAccountExistsRequestProps";
import Axios from "axios";
import IOrganizationAccountExistsResponse from "./IOrganizationAccountExistsResponse";

export default class OrganizationAccountExistsRequest extends RequestComponent<IOrganizationAccountExistsRequestProps, IOrganizationAccountExistsResponse> {
    getFailureMessage() {
        return "Failed to check if email is registered";
    }

    getErrorStatusMessage() {
        const mapping = new Map<number, string>();
        mapping.set(500, "Something went wrong. Try again later");
        return mapping;
    }

    async onLoad() {
        return (await Axios.post(`/api/organization/account/${this.props.organizationId}/exists`, {
            email: this.props.email
        })).data;
    }
}