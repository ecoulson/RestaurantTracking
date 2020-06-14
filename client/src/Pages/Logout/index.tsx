import React from "react";
import Cookie from "../../lib/Cookie";
import AppHistory from "../../AppHistory";
import AuthenticationBackground from "../../Components/AuthenticationLayout/AuthenticationBackground";
import AuthenticationContainer from "../../Components/AuthenticationLayout/AuthenticationContainer";

export default class Logout extends React.Component {
    componentWillMount() {
        Cookie.eraseCookie("token");
        AppHistory.push("/login");
    }
    
    render() {
        return (
            <AuthenticationBackground>
                <AuthenticationContainer>
                    Logging out
                </AuthenticationContainer>
            </AuthenticationBackground>
        )
    }
}