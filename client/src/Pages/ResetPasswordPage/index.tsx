import React from "react";
import AuthenticationBackground from "../../Components/AuthenticationLayout/AuthenticationBackground";
import AuthenticationContainer from "../../Components/AuthenticationLayout/AuthenticationContainer";
import Logo from "../../Components/Logo";
import LoginContainer from "../../Components/AuthenticationLayout/LoginContainer";
import AuthenticationLayoutTitle from "../../Components/AuthenticationLayout/AuthenticationLayoutTitle";
import AuthenticationLayoutText from "../../Components/AuthenticationLayout/AuthenticationLayoutText";
import Form from "../../Components/Form";
import PasswordInput from "../../Components/PasswordInput";
import Submit from "../../Components/Submit";
import IResetPasswordPageState from "./IResetPasswordPageState";
import FormValue from "../../Components/FormInput/FormValue";
import Axios from "axios";
import ToastType from "../../Components/Toast/ToastType";
import Toast from "../../Components/Toast";

export default class ResetPasswordPage extends React.Component<{}, IResetPasswordPageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            password: new FormValue<string>("", false),
            message: "",
            type: ToastType.Error
        }

        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <AuthenticationBackground>
                <AuthenticationContainer>
                    <Toast type={this.state.type} message={this.state.message} />
                    <Logo />
                    <AuthenticationLayoutTitle>Reset Password</AuthenticationLayoutTitle>
                    <AuthenticationLayoutText>Reset your password below</AuthenticationLayoutText>
                    <Form isSubmitting={false}>
                        <PasswordInput 
                            registering 
                            iconColor="#AAAAAA" 
                            onChange={this.handlePassword}/>
                        <Submit 
                            visible={this.state.password.valid} 
                            onClick={this.handleSubmit}>Reset Password</Submit>
                    </Form>
                    <LoginContainer />
                </AuthenticationContainer>
            </AuthenticationBackground>
        )
    }

    private handlePassword(password: FormValue<string>) {
        this.setState({ password })
    }

    private async handleSubmit() {
        if (this.state.password.valid) {
            try {
                const params = new URLSearchParams(window.location.search);
                await Axios.post("/user/password_recovery/reset", {
                    password: this.state.password.value,
                    email: params.get("email"),
                    token: params.get("token")
                });
                this.setState({
                    message: "Successfully reset password",
                    type: ToastType.Success
                })
            } catch (error) {
                this.setState({
                    message: "Failed to reset password",
                    type: ToastType.Error
                })
            }
        }
    }
}