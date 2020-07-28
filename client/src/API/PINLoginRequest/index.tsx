import RequestComponent from "../RequestComponent";
import IPINLoginRequestProps from "./IPINLoginRequestProps";
import Axios from "axios";
import IPINLoginResponse from "./IPINLoginResponse";
import { addToast, removeToast } from "../../Store/Toast/actions";
import IState from "../../Store/IState";
import { connect } from "react-redux";

class PINLoginRequest extends RequestComponent<IPINLoginRequestProps, IPINLoginResponse> {
    getFailureMessage() {
        return "Invalid credentials"
    }

    getSuccessMessage() {
        return "Successfully logged in"
    }

    getFetchingMessage() {
        return "Logging in..."
    }

    async onLoad() {
        return (await Axios.post(`/api/organization/account/${this.props.organizationId}/login`, {
            email: this.props.email,
            password: this.props.password
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

export default connector(PINLoginRequest);