import RequestComponent from "../RequestComponent";
import IResetPasswordRequestProps from "./IResetPasswordRequestProps";
import Axios from "axios";
import IState from "../../Store/IState";
import { addToast, removeToast } from "../../Store/Toast/actions";
import { connect } from "react-redux";

class ResetPasswordRequest extends RequestComponent<IResetPasswordRequestProps> {
    getFailureMessage() {
        return "Failed to reset password"
    }

    getSuccessMessage() {
        return "Successfully reset password"
    }

    getFetchingMessage() {
        return "Resetting password..."
    }

    async onLoad() {
        return (await Axios.post("/api/user/password_recovery/reset", {
            password: this.props.password,
            email: this.props.email,
            token: this.props.token
        })).data
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

export default connector(ResetPasswordRequest);