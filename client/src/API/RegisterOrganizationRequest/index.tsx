import RequestComponent from "../RequestComponent";
import IRegisterOrganizationRequest from "./IRegisterOrganizationRequest";
import Axios from "axios";
import Cookie from "../../lib/Cookie";
import IState from "../../Store/IState";
import { addToast, removeToast } from "../../Store/Toast/actions";
import { connect } from "react-redux";
import IRegisterOrganizationResponse from "./IRegisterOrganizationResponse";

class RegisterOrganizationRequest extends RequestComponent<IRegisterOrganizationRequest, IRegisterOrganizationResponse> {
    getSuccessMessage() {
        return "Successfully registered organization";
    }

    getFailureMessage() {
        return "Failed to register organization"
    }

    getFetchingMessage() {
        return "Registering organization..."
    }
    
    async onLoad() {
        return (await Axios.post('/api/organization/register', {
            organizationName: this.props.organizationName,
            organizationId: this.props.organizationId,
            address: this.props.address
        }, {
            headers: {
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
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

export default connector(RegisterOrganizationRequest);