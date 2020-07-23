import React from "react";
import Form from "../../../Components/Form";
import EmailInput from "../../../Components/EmailInput";
import FormValue from "../../../Components/FormInput/FormValue";
import Button from "../../../Components/Button";
import IVerifyAccountPageState from "./IVerifyAccountPageState";
import AuthenticationLayoutText from "../../../Layouts/AuthenticationLayout/AuthenticationLayoutText";
import LoginContainer from "../../../Layouts/AuthenticationLayout/LoginContainer";
import Axios from "axios";
import ToastType from "../../../Components/Toast/ToastType";
import AuthenticationLayout from "../../../Layouts/AuthenticationLayout";
import ResendVerificationEmailRequest from "../../../API/ResendVerificationEmailRequest";

export default class VerifyAccountPage extends React.Component<{}, IVerifyAccountPageState> {
    constructor(props: {}) {
        super(props);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.state = {
            send: false,
            email: new FormValue("", false)
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onComplete = this.onComplete.bind(this);
    }

    render() {
        return (
            <AuthenticationLayout pageTitle="Activate Account">
                <ResendVerificationEmailRequest
                    send={this.state.send} 
                    onComplete={this.onComplete}
                    email={this.state.email.value} />
                <AuthenticationLayoutText>If you can not find your verification email, get a new verification email below.</AuthenticationLayoutText>
                <Form onSubmit={this.onSubmit}>
                    <EmailInput 
                        id="email"
                        iconColor="#AAAAAA" 
                        hoverColor="#1B2D42"
                        onChange={this.onEmailChange}/>
                    <Button submit>Resend Email</Button>
                </Form>
                <LoginContainer />
            </AuthenticationLayout>
        )
    }

    private onEmailChange(email : FormValue<string>) {
        this.setState({ email })
    }

    private onSubmit() {
        if (this.state.email.valid) {
            this.setState({
                send: true
            })
        }
    }

    private onComplete() {
        this.setState({
            send: false
        });
    }
}