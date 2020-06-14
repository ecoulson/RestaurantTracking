import React from "react";
import LoginBackground from "./LoginBackground";
import LoginContainer from "./LoginContainer";
import Logo from "../Logo";
import LoginTitle from "./LoginTitle";
import ILoginState from "./ILoginState";
import Submit from "../Submit";
import PasswordInput from "../PasswordInput";
import UsernameInput from "../UsernameInput";
import Axios from "axios";
import CheckboxInput from "../CheckboxInput";
import Form from "../Form";
import LoginSettingsContainer from "./LoginSettingsContainer";
import ForgotPasswordLink from "./ForgotPasswordLink";
import SignUpContainer from "./SignUpContainer";
import CheckboxContainer from "./CheckboxContainer";
import Toast from "../Toast";
import Cookie from "../../lib/Cookie";
import AppHistory from "../../AppHistory";

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
                this.redirect()
            }
        }
    }

    render() {
        return (
            <LoginBackground>
                <LoginContainer>
                    <Toast message={this.state.errorMessage} />
                    <Logo />
                    <LoginTitle/>
                    <Form isSubmitting={false}>
                        <UsernameInput onChange={this.onUsernameChange} />
                        <PasswordInput onChange={this.onPasswordChange} />
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
                            visible={this.canSubmitLogin()}/>
                    </Form>
                    <SignUpContainer />
                </LoginContainer>
            </LoginBackground>
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
        // return this.state.username !== "" && 
        //         this.state.password !== "";
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
            this.redirect();
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

    private redirect() {
        if (AppHistory.length === 0) {
            AppHistory.goBack()
        } else {
            AppHistory.push("/dashboard")
        }
    }
}