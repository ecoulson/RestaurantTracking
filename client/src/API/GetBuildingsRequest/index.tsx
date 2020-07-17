import RequestComponent from "../RequestComponent";
import IGetBuildingsRequestProps from "./IGetBuildingsRequestProp";
import IGetBuildingResponse from "./IGetBuildingsResponse";
import Axios from "axios";
import Cookie from "../../lib/Cookie";

export default class GetBuildingsRequest extends RequestComponent<IGetBuildingsRequestProps, IGetBuildingResponse> {
    getSuccessMessage() {
        return ""
    }

    getFailureMessage() {
        return `Failed to get ${this.props.organizationId}'s buildings`
    }

    async onLoad() {
        return (await Axios.get(`/api/organization/buildings/${this.props.organizationId}`, {
            headers: {
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        })).data;
    }
}