import RequestComponent from "../RequestComponent";
import IRegisterOrganizationRequest from "./IRegisterOrganizationRequest";
import Axios from "axios";
import Cookie from "../../lib/Cookie";

export default class RegisterOrganizationRequest extends RequestComponent<IRegisterOrganizationRequest> {
    getSuccessMessage() {
        return "Successfully registered organization";
    }

    getFailureMessage() {
        return "Failed to register organization"
    }
    
    async onLoad() {
        return (await Axios.post('/api/organization/register', {
            organizationName: this.props.organizationName,
            organizationId: this.props.organizationId
        }, {
            headers: {
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        })).data
    }
}