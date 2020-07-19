import RequestComponent from "../RequestComponent";
import ICheckInRequestProps from "./ICheckInRequestProps";
import Axios from "axios";
import Cookie from "../../lib/Cookie";
import ICheckInResponse from "./ICheckInResponse";

export default class CheckInRequest extends RequestComponent<ICheckInRequestProps, ICheckInResponse> {
    getSuccessMessage() {
        return ""
    }

    getFailureMessage() {
        return "Failed to check in"
    }

    async onLoad() {
        return (await Axios.post(`/api/check_in/`, {
            organizationId: this.props.organizationId,
            timeCheckedIn: this.props.timeCheckedIn,
            building: this.props.building
        }, {
            headers: {
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        })).data
    }
}