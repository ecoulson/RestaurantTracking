import React from "react";
import Cookie from "../../../lib/Cookie";
import AppHistory from "../../../AppHistory";
import IAuthenticationWrapperProps from "../IAuthenticationWrapperProps";
import { isSessionActive } from "../../../API";

export default class AuthenticateActiveSession extends React.Component<IAuthenticationWrapperProps> {
    async componentDidMount() {
        const token = Cookie.getCookie("token");
        if (!token) {
            this.props.showError("You must login", 5000)
            return AppHistory.push("/login")
        }
        if (!await isSessionActive()) {
            this.props.showError("Session has expired", 5000)
            return AppHistory.push("/login")
        }
    }

    render() {
        return (
            <>
                {this.props.children}
            </>
        )
    }
}