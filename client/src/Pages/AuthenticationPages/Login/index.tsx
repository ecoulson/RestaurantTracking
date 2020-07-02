import React from "react";
import AuthenticationBackground from "../../../Layouts/AuthenticationLayout/AuthenticationBackground";
import AuthenticationContainer from "../../../Layouts/AuthenticationLayout/AuthenticationContainer";
import Logo from "../../../Components/Logo";
import AuthenticationLayoutTitle from "../../../Layouts/AuthenticationLayout/AuthenticationLayoutTitle";
import ILoginState from "./ILoginState";
import Button from "../../../Components/Button";
import PasswordInput from "../../../Components/PasswordInput";
import UsernameInput from "../../../Components/UsernameInput";
import Axios from "axios";
import CheckboxInput from "../../../Components/CheckboxInput";
import Form from "../../../Components/Form";
import LoginSettingsContainer from "./LoginSettingsContainer";
import ForgotPasswordLink from "./ForgotPasswordLink";
import SignUpContainer from "../../../Layouts/AuthenticationLayout/SignUpContainer";
import Toast from "../../../Components/Toast";
import Cookie from "../../../lib/Cookie";
import AppHistory from "../../../AppHistory";
import ToastType from "../../../Components/Toast/ToastType";
import FormValue from "../../../Components/FormInput/FormValue";

export default class Login extends React.Component<{}, ILoginState> {
    constructor(props : {}) {
        super(props);
        this.state = {
            password: "",
            username: "",
            rememberMe: false,
            errorMessage: ""
        }
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.login = this.login.bind(this);
        this.onRememberMeChange = this.onRememberMeChange.bind(this);
    }

    componentDidMount() {
        document.title = "Login"
    }

    render() {
        return (
            <AuthenticationBackground>
                <AuthenticationContainer>
                    <Toast type={ToastType.Error} message={this.state.errorMessage} />
                    <Logo />
                    <AuthenticationLayoutTitle>Login</AuthenticationLayoutTitle>
                    <Form onSubmit={this.login} isSubmitting={false}>
                        <UsernameInput 
                            iconColor="#AAAAAA" 
                            hoverColor="#1B2D42"
                            onChange={this.onUsernameChange} />
                        <PasswordInput 
                            iconColor="#AAAAAA"
                            hoverColor="#1B2D42"
                            onChange={this.onPasswordChange} />
                        <LoginSettingsContainer>
                            <CheckboxInput 
                                onChange={this.onRememberMeChange}
                                label="Remember me"/>
                            <ForgotPasswordLink />
                        </LoginSettingsContainer>
                        <Button
                            submit
                            visible={this.canSubmitLogin()}>
                            Submit
                        </Button>
                    </Form>
                    <SignUpContainer />
                </AuthenticationContainer>
            </AuthenticationBackground>
        )
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

    private canSubmitLogin() {
        return true;
    }

    private async login() {
        try {
            const res = await Axios.post("/api/authentication/login", {
                username: this.state.username,
                password: this.state.password,
                rememberMe: this.state.rememberMe
            });
            Cookie.eraseCookie("token")
            if (this.state.rememberMe) {
                Cookie.setCookie("token", res.data.data.token)
            } else {
                Cookie.setCookie("token", res.data.data.token, 1)
            }
            if (!res.data.data.verified) {
                return AppHistory.push("/verify")
            } else {
                AppHistory.push("/dashboard")
            }
        } catch(error) {
            if (error.response.status === 500) {
                this.setState({
                    errorMessage: "Failed to login. Try again later"
                })
            } else {
                this.setState({
                    errorMessage: "Invalid credentials"
                })
            }
        }
    }
}