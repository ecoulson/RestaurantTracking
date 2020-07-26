import RequestComponent from "../RequestComponent";
import ISendPINVerificationRequestProps from "./ISendPINVerificationRequestProps";
import Axios from "axios";
import Cookie from "../../lib/Cookie";
import IState from "../../Store/IState";
import { addToast, removeToast } from "../../Store/Toast/actions";
import { connect } from "react-redux";

class SendPINVerificationRequest extends RequestComponent<ISendPINVerificationRequestProps> {
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

const mapState = (state : IState) => {
    return {}
}

const mapDispatch = {
    addToast: addToast,
    removeToast: removeToast
}

const connector = connect(mapState, mapDispatch);

export default connector(SendPINVerificationRequest);