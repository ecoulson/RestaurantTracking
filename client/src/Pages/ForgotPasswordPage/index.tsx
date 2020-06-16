import React from "react";
import AuthenticationBackground from "../../Components/AuthenticationLayout/AuthenticationBackground";
import AuthenticationContainer from "../../Components/AuthenticationLayout/AuthenticationContainer";
import Logo from "../../Components/Logo";
import AuthenticationLayoutTitle from "../../Components/AuthenticationLayout/AuthenticationLayoutTitle";
import Form from "../../Components/Form";
import EmailInput from "../../Components/EmailInput";
import AuthenticationLayoutText from "../../Components/AuthenticationLayout/AuthenticationLayoutText";
import LoginContainer from "../../Components/AuthenticationLayout/LoginContainer";
import IForgotPasswordPageState from "./IForgotPasswordPageState";
import Toast from "../../Components/Toast";
import ToastType from "../../Components/Toast/ToastType";
import IFormValue from "../../Components/FormInput/IFormValue";
import Submit from "../../Components/Submit";
import FormValue from "../../Components/FormInput/FormValue";
import Axios from "axios";

export default class ForgotPasswordPage extends React.Component<{}, IForgotPasswordPageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            message: "",
            email: new FormValue<string>("", false),
            type: ToastType.Error
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <AuthenticationBackground>
                <AuthenticationContainer>
                    <Toast type={this.state.type} message={this.state.message} />
                    <Logo/>
                    <AuthenticationLayoutTitle>Forgot Password</AuthenticationLayoutTitle>
                    <AuthenticationLayoutText>Enter your email to begin the password recovery process</AuthenticationLayoutText>
                    <Form isSubmitting={false}>
                        <EmailInput iconColor="#AAAAAA" onChange={this.handleEmailChange} />
                    </Form>
                    <Submit onClick={this.handleSubmit} visible={this.state.email.valid}>Send Email</Submit>
                    <LoginContainer />
                </AuthenticationContainer>
            </AuthenticationBackground>
        )
    }

    private handleEmailChange(email : IFormValue<string>) {
        this.setState({ email })
    }

    private async handleSubmit() {
        if (this.state.email.valid) {
            try {
                const res = await Axios.post("/user/password_recovery/recover", {
                    email: this.state.email.value
                })
                this.setState({
                    message: "Sent password reset email",
                    type: ToastType.Success
                })
            } catch (error) {
                this.setState({
                    message: "Failed to send password reset email",
                    type: ToastType.Error
                })
            }
        }
    }
}