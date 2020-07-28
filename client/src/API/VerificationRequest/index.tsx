import RequestComponent from "../RequestComponent";
import IVerificationRequestProps from "./IVerificationRequestProps";
import Axios from "axios";
import IState from "../../Store/IState";
import { addToast, removeToast } from "../../Store/Toast/actions";
import { connect } from "react-redux";

class VerificationRequest extends RequestComponent<IVerificationRequestProps> {
    getFailureMessage() {
        return `Failed to verify account for ${this.props.email}`
    }

    getSuccessMessage() {
        return "Verified account"
    }

    getFetchingMessage() {
        return "Verifying account...";
    }

    async onLoad() {
        return (await Axios.get(
            `/api/user/verification/verify?email=${this.props.email}&token=${this.props.token}`
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

export default connector(VerificationRequest);