import RequestComponent from "../RequestComponent";
import IVerificationRequestProps from "./IVerificationRequestProps";
import Axios from "axios";

export default class VerificationRequest extends RequestComponent<IVerificationRequestProps> {
    getFailureMessage() {
        return `Failed to verify account for ${this.props.email}`
    }

    async onLoad() {
        return (await Axios.get(
            `/api/user/verification/verify?email=${this.props.email}&token=${this.props.token}`
        )).data;
    }
}