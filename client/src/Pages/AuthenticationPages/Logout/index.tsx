import React from "react";
import Cookie from "../../../lib/Cookie";
import AppHistory from "../../../AppHistory";
import AuthenticationBackground from "../../../Layouts/AuthenticationLayout/AuthenticationBackground";
import AuthenticationContainer from "../../../Layouts/AuthenticationLayout/AuthenticationContainer";
import AuthenticationLayoutTitle from "../../../Layouts/AuthenticationLayout/AuthenticationLayoutTitle";
import Logo from "../../../Components/Logo";
import ILogoutProps from "./ILogoutProps";

export default class Logout extends React.Component<ILogoutProps> {
    componentDidMount() {
        document.title = "Logout"
        Cookie.eraseCookie("token");
        this.props.showSuccess("Successfully logged out", 3000);
        AppHistory.push("/login");
    }
    
    render() {
        return (
            <AuthenticationBackground>
                <AuthenticationContainer>
                    <Logo />
                    <AuthenticationLayoutTitle>Logging Out...</AuthenticationLayoutTitle>
                </AuthenticationContainer>
            </AuthenticationBackground>
        )
    }
}