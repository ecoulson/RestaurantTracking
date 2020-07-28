import Axios from "axios";
import RequestComponent from "../RequestComponent";
import IRecoverPasswordRequestProps from "./IRecoverPasswordRequestProps";
import IState from "../../Store/IState";
import { addToast, removeToast } from "../../Store/Toast/actions";
import { connect } from "react-redux";

class RecoverPasswordRequest extends RequestComponent<IRecoverPasswordRequestProps> {
    getSuccessMessage() {
        return "Sent password reset email";
    }

    getFailureMessage() {
        return "Failed to send password reset email"
    }

    getFetchingMessage() {
        return "Sending password reset email...";
    }

    async onLoad() {
        return (await Axios.post(this.props.url, { 
            email: this.props.email
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

export default connector(RecoverPasswordRequest);