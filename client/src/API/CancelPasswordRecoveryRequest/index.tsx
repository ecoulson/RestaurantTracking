import RequestComponent from "../RequestComponent";
import ICancelPasswordRecoveryRequestProps from "./ICancelPasswordRecoveryRequestProps";
import Axios from "axios";
import IState from "../../Store/IState";
import { connect } from "react-redux";
import { addToast, removeToast } from "../../Store/Toast/actions";

class CancelPasswordRecoveryRequest extends RequestComponent<ICancelPasswordRecoveryRequestProps> {
    getFailureMessage() {
        return "Something went wrong";
    }

    getSuccessMessage() {
        return "Successfully canceled password reset";
    }

    getFetchingMessage() {
        return "Canceling password reset...";
    }

    getErrorStatusMessage() {
        const mapping = new Map<number, string>();
        mapping.set(400, "Invalid request");
        return mapping;
    }

    async onLoad() {
        return (await Axios.get(
            `/api/user/password_recovery/cancel_recover?email=${this.props.email}&token=${this.props.token}`
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

export default connector(CancelPasswordRecoveryRequest);