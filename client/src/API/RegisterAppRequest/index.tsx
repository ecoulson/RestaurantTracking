import RequestComponent from "../RequestComponent";
import IRegisterAppRequest from "./IRegisterAppRequest";
import Axios from "axios";
import Cookie from "../../lib/Cookie";

export default class RegisterAppRequest extends RequestComponent<IRegisterAppRequest> {
    getSuccessMessage() {
        return "Succesfully registered app"
    }

    getFailureMessage() {
        return "Failed to register app"
    }

    getFetchingMessage() {
        return "Registering app..."
    }

    async onLoad() {
        return (await Axios.post(`/api/app/`, {
            organizationId: this.props.organizationId
        }, {
            headers: {
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        })).data;
    }
}