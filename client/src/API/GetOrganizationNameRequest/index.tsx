import RequestComponent from "../RequestComponent";
import IGetOrganizationNameResponse from "./IGetOrganizationNameResponse";
import IGetOrganizationNameRequestProps from "./IGetOrganizationNameRequestProps";
import Axios from "axios";

export default class GetOrganizationNameRequest extends RequestComponent<IGetOrganizationNameRequestProps, IGetOrganizationNameResponse> {
    getFailureMessage() {
        return "Failed to get organization name";
    }

    getSuccessMessage() {
        return "";
    }

    async onLoad() {
        return (await Axios.get(`/api/organization/${this.props.organizationId}/name`)).data;
    }
}