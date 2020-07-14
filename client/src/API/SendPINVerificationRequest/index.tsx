import RequestComponent from "../RequestComponent";
import ISendPINVerificationRequestProps from "./ISendPINVerificationRequestProps";
import Axios from "axios";
import Cookie from "../../lib/Cookie";

export default class SendPINVerificationRequest extends RequestComponent<ISendPINVerificationRequestProps> {
    getSuccessMessage() {
        return "Resent verification email";
    }

    getFailureMessage() {
        return "Failed to resend email";
    }

    async onLoad() {
        return (await Axios.post(`/api/organization/account/${this.props.organizationId}/resend-verification/`, {
            email: this.props.email
        }, {
            headers: {
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        })).data;
    }
}