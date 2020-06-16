import React from "react";
import Cookie from "../../lib/Cookie";
import AppHistory from "../../AppHistory";
import AuthenticationBackground from "../../Components/AuthenticationLayout/AuthenticationBackground";
import AuthenticationContainer from "../../Components/AuthenticationLayout/AuthenticationContainer";
import AuthenticationLayoutTitle from "../../Components/AuthenticationLayout/AuthenticationLayoutTitle";
import Logo from "../../Components/Logo";

export default class Logout extends React.Component {
    componentWillMount() {
        Cookie.eraseCookie("token");
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