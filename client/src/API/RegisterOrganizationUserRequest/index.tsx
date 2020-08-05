import RequestComponent from "../RequestComponent";
import IRegisterOrganizationUserRequest from "./IRegisterOrganizationUserRequest";
import Axios from "axios";
import IState from "../../Store/IState";
import { addToast, removeToast } from "../../Store/Toast/actions";
import { connect } from "react-redux";

class RegisterOrganizationUserRequest extends RequestComponent<IRegisterOrganizationUserRequest> {
    getSuccessMessage() {
        return "Successfully registered user"
    }

    getFailureMessage() {
        return "Failed to register user"
    }

    getFetchingMessage() {
        return "Registering user...";
    }

    async onLoad() {
        return (await Axios.post(`/api/organization/account/${this.props.organizationId}/register`, {
            email: this.props.email,
            username: this.props.username,
            password: this.props.password,
            firstName: this.props.firstName,
            lastName: this.props.lastName
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

export default connector(RegisterOrganizationUserRequest);