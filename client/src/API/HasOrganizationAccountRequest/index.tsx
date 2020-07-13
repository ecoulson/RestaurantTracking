import RequestComponent from "../RequestComponent";
import IHasOrganizationAccountRequestProps from "./IHasOrganizationAccountRequestProps";
import Axios from "axios";

export default class HasOrganizationAccountRequest extends RequestComponent<IHasOrganizationAccountRequestProps> {
    getFailureMessage() {
        return "Failed to check if email is registered";
    }

    getErrorStatusMessage() {
        const mapping = new Map<number, string>();
        mapping.set(500, "Something went wrong. Try again later");
        return mapping;
    }

    async onLoad() {
        return (await Axios.post(`/api/organization/${this.props.organizationId}/sign-on`, {
            email: this.props.email
        })).data
    }
}