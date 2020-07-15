import RequestComponent from "../RequestComponent";
import IPINLoginRequestProps from "./IPINLoginRequestProps";
import Axios from "axios";
import IPINLoginResponse from "./IPINLoginResponse";

export default class PINLoginRequest extends RequestComponent<IPINLoginRequestProps, IPINLoginResponse> {
    async onLoad() {
        return (await Axios.post(`/api/organization/account/${this.props.organizationId}/login`, {
            email: this.props.email,
            password: this.props.password
        })).data;
    }
}