import RequestComponent from "../RequestComponent";
import IUserRegistrationRequestProps from "./IUserRegistrationRequestProps";
import Axios from "axios";

export default class UserRegistrationRequest extends RequestComponent<IUserRegistrationRequestProps> {
    getFailureMessage() {
        return "Failed to register user";
    }

    getSuccessMessage() {
        return "Successfully registered account, please check your email"
    }

    async onLoad() {
        return (await Axios.post("/api/user/registration/register", {
            username: this.props.username,
            email: this.props.email,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            password: this.props.password
        })).data;
    }
}