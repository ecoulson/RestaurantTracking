import Axios from "axios";
import ILoginRequestProps from "./ILoginRequestProps";
import RequestComponent from "../RequestComponent";
import ILoginResponse from "./ILoginResponse";

export default class LoginRequest extends RequestComponent<ILoginRequestProps, ILoginResponse> {
    getFailureMessage() {
        return "Invalid credentials";
    }

    getErrorStatusMessage() {
        const mapping = new Map<number, string>();
        mapping.set(500, "Failed to login. Try again later");
        return mapping;
    }

    async onLoad() {
        return (await Axios.post("/api/authentication/login", { 
            username: this.props.username, 
            password: this.props.password, 
            rememberMe: this.props.rememberMe 
        })).data;
    }
}