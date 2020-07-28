import RequestComponent from "../RequestComponent";
import IOrganizationAccountVerificationRequest from "./IOrganizationAccountVerificationRequest";
import Axios from "axios";
import IState from "../../Store/IState";
import { addToast, removeToast } from "../../Store/Toast/actions";
import { connect } from "react-redux";

class OrganizationAccountVerificationRequest extends RequestComponent<IOrganizationAccountVerificationRequest> {
    getFailureMessage() {
        return "Failed to verify user"
    }

    async onLoad() {
        return (await Axios.post(`/api/organization/account/${this.props.organizationId}/verify`, {
            email: this.props.email,
            password: this.props.password
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

export default connector(OrganizationAccountVerificationRequest);