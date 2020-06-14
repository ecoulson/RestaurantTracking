import React from "react";
import AuthenticationBackground from "../../Components/AuthenticationLayout/AuthenticationBackground";
import AuthenticationContainer from "../../Components/AuthenticationLayout/AuthenticationContainer";
import Logo from "../../Components/Logo";
import AuthenticationLayoutTitle from "../../Components/AuthenticationLayout/AuthenticationLayoutTitle";
import ILoginState from "./ILoginState";
import Submit from "../../Components/Submit";
import PasswordInput from "../../Components/PasswordInput";
import UsernameInput from "../../Components/UsernameInput";
import Axios from "axios";
import CheckboxInput from "../../Components/CheckboxInput";
import Form from "../../Components/Form";
import LoginSettingsContainer from "./LoginSettingsContainer";
import ForgotPasswordLink from "./ForgotPasswordLink";
import SignUpContainer from "../../Components/AuthenticationLayout/SignUpContainer";
import CheckboxContainer from "./CheckboxContainer";
import Toast from "../../Components/Toast";
import Cookie from "../../lib/Cookie";
import AppHistory from "../../AppHistory";
import ToastType from "../../Components/Toast/ToastType";

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

    async componentWillMount() {
        const token = Cookie.getCookie("token");
        if (token) {
            const res = await Axios.get(`/authentication/is_session_active`)
            if (res.data.data.isActive) {
                AppHistory.push("/dashboard")
            }
        }
    }

    render() {
        return (
            <AuthenticationBackground>
                <AuthenticationContainer>
                    <Toast type={ToastType.Error} message={this.state.errorMessage} />
                    <Logo />
                    <AuthenticationLayoutTitle>Login</AuthenticationLayoutTitle>
                    <Form isSubmitting={false}>
                        <UsernameInput iconColor="#AAAAAA" onChange={this.onUsernameChange} />
                        <PasswordInput iconColor="#AAAAAA" onChange={this.onPasswordChange} />
                        <LoginSettingsContainer>
                            <CheckboxContainer>
                                <CheckboxInput 
                                    onChange={this.onRememberMeChange}
                                    label="Remember me"/>
                            </CheckboxContainer>
                            <ForgotPasswordLink />
                        </LoginSettingsContainer>
                        <Submit 
                            onClick={this.login} 
                            visible={this.canSubmitLogin()}>
                                Submit
                        </Submit>
                    </Form>
                    <SignUpContainer />
                </AuthenticationContainer>
            </AuthenticationBackground>
        )
    }

    private onPasswordChange(password : string) {
        this.setState({ password })
    }

    private onUsernameChange(username : string) {
        this.setState({ username })
    }

    private onRememberMeChange(rememberMe: boolean) {
        this.setState({ rememberMe })
    }

    private canSubmitLogin() {
        return true;
    }

    private async login() {
        try {
            const res = await Axios.post("/authentication/login", {
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