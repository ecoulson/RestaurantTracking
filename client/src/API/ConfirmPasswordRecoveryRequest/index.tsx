import RequestComponent from "../RequestComponent";
import IConfirmPasswordRecoveryRequestProps from "./IConfirmPasswordRecoveryRequestProps";
import Axios from "axios";

export default class ConfirmPasswordRecoveryRequest extends RequestComponent<IConfirmPasswordRecoveryRequestProps> {
    getFailureMessage() {
        return "Something went wrong";
    }

    getErrorStatusMessage() {
        const mapping = new Map<number, string>();
        mapping.set(400, "Invalid request");
        return mapping;
    }

    async onLoad() {
        return (await Axios.get(
            `/api/user/password_recovery/confirm?email=${this.props.email}&token=${this.props.token}`
        )).data;
    }
}