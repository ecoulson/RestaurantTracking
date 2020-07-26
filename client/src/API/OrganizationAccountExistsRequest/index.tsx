import RequestComponent from "../RequestComponent";
import IOrganizationAccountExistsRequestProps from "./IOrganizationAccountExistsRequestProps";
import Axios from "axios";
import IOrganizationAccountExistsResponse from "./IOrganizationAccountExistsResponse";
import { connect } from "react-redux";
import { removeToast, addToast } from "../../Store/Toast/actions";
import IState from "../../Store/IState";

class OrganizationAccountExistsRequest extends RequestComponent<IOrganizationAccountExistsRequestProps, IOrganizationAccountExistsResponse> {
    getFailureMessage() {
        return "Failed to check if email is registered";
    }
    
    getSuccessMessage() {
        return "Organization account exists"
    }

    getErrorStatusMessage() {
        const mapping = new Map<number, string>();
        mapping.set(500, "Something went wrong. Try again later");
        return mapping;
    }

    async onLoad() {
        return (await Axios.post(`/api/organization/account/${this.props.organizationId}/exists`, {
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

export default connector(OrganizationAccountExistsRequest);