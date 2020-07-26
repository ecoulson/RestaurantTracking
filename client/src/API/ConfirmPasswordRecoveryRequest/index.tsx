import RequestComponent from "../RequestComponent";
import IConfirmPasswordRecoveryRequestProps from "./IConfirmPasswordRecoveryRequestProps";
import Axios from "axios";
import IState from "../../Store/IState";
import { connect } from "react-redux";
import { addToast, removeToast } from "../../Store/Toast/actions";

class ConfirmPasswordRecoveryRequest extends RequestComponent<IConfirmPasswordRecoveryRequestProps> {
    getFailureMessage() {
        return "Something went wrong";
    }

    getErrorStatusMessage() {
        const mapping = new Map<number, string>();
        mapping.set(400, "Invalid request");
        return mapping;
    }

    getSuccessMessage() {
        return "Confirmed password recovery"
    }

    async onLoad() {
        return (await Axios.get(
            `/api/user/password_recovery/confirm?email=${this.props.email}&token=${this.props.token}`
        )).data;
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

export default connector(ConfirmPasswordRecoveryRequest);