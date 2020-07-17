import RequestComponent from "../RequestComponent";
import ICheckoutRequestProps from "./ICheckOutRequestProps";
import ICheckInResponse from "../CheckInRequest/ICheckInResponse";
import Axios from "axios";
import Cookie from "../../lib/Cookie";

export default class CheckOutRequest extends RequestComponent<ICheckoutRequestProps, ICheckInResponse> {
    getFailureMessage() {
        return "Failed to checkout"
    }

    getSuccessMessage() {
        return "Successfully checked out"
    }

    async onLoad() {
        return (await Axios.post(`/api/check_in/checkout`, {
            checkInId: this.props.checkInId
        }, {
            headers: {
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        })).data
    }
}