import React from "react";
import ILoginState from "./ILoginState";
import Button from "../../../Components/Button";
import PasswordInput from "../../../Components/PasswordInput";
import UsernameInput from "../../../Components/UsernameInput";
import Form from "../../../Components/Form";
import LoginSettingsContainer from "./LoginSettingsContainer";
import SignUpContainer from "../../../Layouts/AuthenticationLayout/SignUpContainer";
import Cookie from "../../../lib/Cookie";
import AppHistory from "../../../AppHistory";
import FormValue from "../../../Components/FormInput/FormValue";
import AuthenticationLayout from "../../../Layouts/AuthenticationLayout";
import LoginRequest from "../../../API/LoginRequest";
import ILoginResponse from "../../../API/LoginRequest/ILoginResponse";
import IResponse from "../../../API/IResponse";

const SessionDurationDays = 1;

export default class Login extends React.Component<{}, ILoginState> {
    constructor(props : {}) {
        super(props);
        this.state = {
            password: "",
            username: "",
            rememberMe: false,
            isLoggingIn: false
        }
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onRememberMeChange = this.onRememberMeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onError = this.onError.bind(this);
    }

    render() {
        return (
            <AuthenticationLayout pageTitle="Login">
                <Form onSubmit={this.handleSubmit}>
                    <LoginRequest
                        send={this.state.isLoggingIn}
                        rememberMe={this.state.rememberMe}
                        username={this.state.username} 
                        password={this.state.password} 
                        onComplete={this.onLogin}
                        onError={this.onError} />
                    <UsernameInput 
                        id="username"
                        iconColor="#AAAAAA" 
                        hoverColor="#1B2D42"
                        onChange={this.onUsernameChange} />
                    <PasswordInput 
                        id="password"
                        iconColor="#AAAAAA"
                        hoverColor="#1B2D42"
                        onChange={this.onPasswordChange} />
                    <LoginSettingsContainer onRememberMeChange={this.onRememberMeChange} />
                    <Button submit>Submit</Button>
                </Form>
                <SignUpContainer />
            </AuthenticationLayout>
        )
    }

    private handleSubmit() {
        this.setState({
            isLoggingIn: true
        })
    }

    private async onLogin(response : IResponse<ILoginResponse>) {
        Cookie.eraseCookie("token");
        this.setTokenCookie(response.data.token);
        this.redirect(response.data.verified);
    }

    private onError() {
        this.setState({
            isLoggingIn: false
        })
    }

    private setTokenCookie(token: string) {
        if (this.state.rememberMe) {
            Cookie.setCookie("token", token, 365)
        } else {
            Cookie.setCookie("token", token, SessionDurationDays)
        }
    }

    private redirect(verified : boolean) {
        if (!verified) {
            AppHistory.push("/verify")
        } else {
            AppHistory.push("/dashboard")
        }
    }

    private onPasswordChange(password : FormValue<string>) {
        this.setState({ password: password.value })
    }

    private onUsernameChange(username : FormValue<string>) {
        this.setState({ username: username.value })
    }

    private onRememberMeChange(rememberMe: boolean) {
        this.setState({ rememberMe })
    }
}