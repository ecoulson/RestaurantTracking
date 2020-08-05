import RequestComponent from "../RequestComponent";
import IRegisterAnonymousOrganizationUserRequest from "./IRegisterAnonymousOrganizationUserRequest";
import Axios from "axios";
import { addToast, removeToast } from "../../Store/Toast/actions";
import IState from "../../Store/IState";
import { connect } from "react-redux";
import IRegisterAnonymousOrganizationUserResponse from "./IRegisterAnonymousOrganizationUserResponse";

class ReigsterAnonymousOrganizationUserRequest extends RequestComponent<IRegisterAnonymousOrganizationUserRequest, IRegisterAnonymousOrganizationUserResponse> {
    async onLoad() {
        return (await Axios.post(`/api/organization/account/${this.props.organizationId}/register-anonymous`)).data;
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

export default connector(ReigsterAnonymousOrganizationUserRequest);
