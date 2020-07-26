import Axios from "axios";
import ILoginRequestProps from "./ILoginRequestProps";
import RequestComponent from "../RequestComponent";
import ILoginResponse from "./ILoginResponse";
import IState from "../../Store/IState";
import { connect } from "react-redux";
import { removeToast, addToast } from "../../Store/Toast/actions";

class LoginRequest extends RequestComponent<ILoginRequestProps, ILoginResponse> {
    getFailureMessage() {
        return "Invalid credentials";
    }

    getSuccessMessage() {
        return "Successfully logged in"
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

const mapState = (state : IState) => {
    return {};
}

const mapDispatch = {
    addToast: addToast,
    removeToast: removeToast
}

const connector = connect(mapState, mapDispatch);

export default connector(LoginRequest);