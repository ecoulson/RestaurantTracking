import Axios from "axios";
import RequestComponent from "../RequestComponent";
import IRecoverPasswordRequestProps from "./IRecoverPasswordRequestProps";

export default class RecoverPasswordRequest extends RequestComponent<IRecoverPasswordRequestProps> {
    getSuccessMessage() {
        return "Sent password reset email";
    }

    getFailureMessage() {
        return "Failed to send password reset email"
    }

    async onLoad() {
        return (await Axios.post(this.props.url, { 
            email: this.props.email
        })).data;
    }
}