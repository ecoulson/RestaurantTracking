import React from "react";
import Cookie from "../../lib/Cookie";
import AppHistory from "../../AppHistory";
import AuthenticationBackground from "../../Layouts/AuthenticationLayout/AuthenticationBackground";
import AuthenticationContainer from "../../Layouts/AuthenticationLayout/AuthenticationContainer";
import AuthenticationLayoutTitle from "../../Layouts/AuthenticationLayout/AuthenticationLayoutTitle";
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