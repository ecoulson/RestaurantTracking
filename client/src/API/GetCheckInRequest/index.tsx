import RequestComponent from "../RequestComponent";
import IGetCheckInRequest from "./IGetCheckInRequest";
import ICheckInResponse from "../CheckInRequest/ICheckInResponse";
import Axios from "axios";
import Cookie from "../../lib/Cookie";

export default class GetCheckInRequest extends RequestComponent<IGetCheckInRequest, ICheckInResponse> {
    getSuccessMessage() {
        return "";
    }

    getFailureMessage() {
        return "Failed to get check in"
    }

    async onLoad() {
        return (await Axios.get(`/api/check_in/${this.props.checkInId}`, {
            headers: {
                "Authorization": `Bearer: ${Cookie.getCookie("token")}`
            }
        })).data
    }
}