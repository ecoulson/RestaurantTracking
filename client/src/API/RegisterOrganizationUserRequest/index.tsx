import RequestComponent from "../RequestComponent";
import IRegisterOrganizationUserRequest from "./IRegisterOrganizationUserRequest";
import Axios from "axios";

export default class RegisterOrganizationUserRequest extends RequestComponent<IRegisterOrganizationUserRequest> {
    getSuccessMessage() {
        return "Successfully registered user"
    }

    getFailureMessage() {
        return "Failed to register user"
    }

    async onLoad() {
        return (await Axios.post(`/api/organization/account/${this.props.organizationId}/register`, {
            email: this.props.email,
            password: this.props.password
        })).data
    }
}