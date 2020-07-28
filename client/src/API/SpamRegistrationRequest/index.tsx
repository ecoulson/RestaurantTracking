import RequestComponent from "../RequestComponent";
import ISpamRegistrationRequestProps from "./ISpamRegistrationRequestProps";
import Axios from "axios";
import IState from "../../Store/IState";
import { addToast, removeToast } from "../../Store/Toast/actions";
import { connect } from "react-redux";

class SpamRegistrationRequest extends RequestComponent<ISpamRegistrationRequestProps, {}> {
    getSuccessMessage() {
        return "Successfully canceled registration"
    }

    getFailureMessage() {
        return "Failed to cancel registration"
    }

    getFetchingMessage() {
        return "Processing..."
    }

    getErrorStatusMessage() {
        const mapping = new Map<number, string>();
        mapping.set(500, "Something went wrong");
        return mapping;
    }

    async onLoad() {
        return (await Axios.get(
            `/api/user/verification/spam?email=${this.props.email}&token=${this.props.token}`
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

export default connector(SpamRegistrationRequest);