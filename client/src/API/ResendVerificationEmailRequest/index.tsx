import RequestComponent from "../RequestComponent";
import IResendVerificationEmailRequestProps from "./IResendVerificationEmailRequestProps";
import Axios from "axios";
import Cookie from "../../lib/Cookie";

export default class ResendVerificationEmailRequest extends RequestComponent<IResendVerificationEmailRequestProps> {
    getSuccessMessage() {
        return "Resent verification email";
    }

    getFailureMessage() {
        return "No account associated with that email";
    }

    getErrorStatusMessage() {
        const mapping = new Map<number, string>();
        mapping.set(500, "Failed to send verification email");
        return mapping;
    }

    async onLoad() {
        return (await Axios.post("/api/user/registration/send_verification", {
            email: this.props.email
        }, {
            headers: {
                Authorization: `Bearer ${Cookie.getCookie("token")}`
            }
        })).data
    }
}