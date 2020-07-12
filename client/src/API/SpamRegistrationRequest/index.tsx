import RequestComponent from "../RequestComponent";
import ISpamRegistrationRequestProps from "./ISpamRegistrationRequestProps";
import Axios from "axios";

export default class SpamRegistrationRequest extends RequestComponent<ISpamRegistrationRequestProps> {
    getSuccessMessage() {
        return "Successfully canceled registration"
    }

    getFailureMessage() {
        return "Failed to cancel registration"
    }

    getErrorStatusMessage() {
        const mapping = new Map<number, string>();
        mapping.set(500, "Something went wrong");
        return mapping;
    }

    async onLoad() {
        return (await Axios.get(
            `/api/user/verification/spam?email=${this.props.email}&token=${this.props.token}`
        )).data;
    }
}