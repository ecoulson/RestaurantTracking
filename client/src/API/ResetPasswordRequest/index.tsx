import RequestComponent from "../RequestComponent";
import IResetPasswordRequestProps from "./IResetPasswordRequestProps";
import Axios from "axios";

export default class ResetPasswordRequest extends RequestComponent<IResetPasswordRequestProps> {
    getFailureMessage() {
        return "Failed to reset password"
    }

    getSuccessMessage() {
        return "Successfully reset password"
    }

    async onLoad() {
        return (await Axios.post("/api/user/password_recovery/reset", {
            password: this.props.password,
            email: this.props.email,
            token: this.props.token
        })).data
    }
}