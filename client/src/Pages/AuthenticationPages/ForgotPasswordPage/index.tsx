import React from "react";
import Form from "../../../Components/Form";
import EmailInput from "../../../Components/EmailInput";
import AuthenticationLayoutText from "../../../Layouts/AuthenticationLayout/AuthenticationLayoutText";
import LoginContainer from "../../../Layouts/AuthenticationLayout/LoginContainer";
import IForgotPasswordPageState from "./IForgotPasswordPageState";
import IFormValue from "../../../Components/FormInput/IFormValue";
import Button from "../../../Components/Button";
import FormValue from "../../../Components/FormInput/FormValue";
import AuthenticationLayout from "../../../Layouts/AuthenticationLayout";
import RecoverPasswordRequest from "../../../API/RecoverPasswordRequest";

export default class ForgotPasswordPage extends React.Component<{}, IForgotPasswordPageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            email: new FormValue<string>("", false),
            isRecovering: false
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
    }

    render() {
        return (
            <AuthenticationLayout pageTitle="Forgot Password">
                <RecoverPasswordRequest 
                    url="/api/user/password_recovery/recover"
                    send={this.state.isRecovering}
                    email={this.state.email.value} 
                    onComplete={this.handleComplete} />
                <AuthenticationLayoutText>Enter your email to begin the password recovery process</AuthenticationLayoutText>
                <Form onSubmit={this.handleSubmit}>
                    <EmailInput 
                        id="forgot-password"
                        iconColor="#AAAAAA" 
                        hoverColor="#1B2D42"
                        onChange={this.handleEmailChange} />
                    <Button submit>Send Email</Button>
                </Form>
                <LoginContainer />
            </AuthenticationLayout>
        )
    }

    private handleEmailChange(email : IFormValue<string>) {
        this.setState({ email })
    }

    private handleSubmit() {
        this.setState({
            isRecovering: true
        })
    }

    private handleComplete() {
        this.setState({
            isRecovering: false
        })
    }
}