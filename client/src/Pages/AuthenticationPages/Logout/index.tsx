import React from "react";
import Cookie from "../../../lib/Cookie";
import AppHistory from "../../../AppHistory";
import ILogoutProps from "./ILogoutProps";
import AuthenticationLayout from "../../../Layouts/AuthenticationLayout";

export default class Logout extends React.Component<ILogoutProps> {
    componentDidMount() {
        Cookie.eraseCookie("token");
        this.props.showSuccess("Successfully logged out", 3000);
        AppHistory.push("/login");
    }
    
    render() {
        return (
            <AuthenticationLayout pageTitle="Logging Out" />
        )
    }
}