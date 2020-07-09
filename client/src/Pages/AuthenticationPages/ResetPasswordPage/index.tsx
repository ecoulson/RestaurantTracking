import React from "react";
import LoginContainer from "../../../Layouts/AuthenticationLayout/LoginContainer";
import AuthenticationLayoutText from "../../../Layouts/AuthenticationLayout/AuthenticationLayoutText";
import Form from "../../../Components/Form";
import PasswordInput from "../../../Components/PasswordInput";
import Button from "../../../Components/Button";
import IResetPasswordPageState from "./IResetPasswordPageState";
import FormValue from "../../../Components/FormInput/FormValue";
import AuthenticationLayout from "../../../Layouts/AuthenticationLayout";
import ResetPasswordRequest from "../../../API/ResetPasswordRequest";

export default class ResetPasswordPage extends React.Component<{}, IResetPasswordPageState> {
    private urlParams : URLSearchParams;

    constructor(props: {}) {
        super(props);
        this.state = {
            password: new FormValue<string>("", false),
            send: false,
        }
        
        this.urlParams = new URLSearchParams(window.location.search);

        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onComplete = this.onComplete.bind(this);
    }

    render() {
        return (
            <AuthenticationLayout pageTitle="Reset Password">
                <AuthenticationLayoutText>Reset your password below</AuthenticationLayoutText>
                <Form onSubmit={this.handleSubmit}>
                    <ResetPasswordRequest 
                        send={this.state.send}
                        email={this.getEmail()}
                        token={this.getToken()}
                        password={this.state.password.value}
                        onComplete={this.onComplete}
                        />
                    <PasswordInput 
                        registering 
                        iconColor="#AAAAAA" 
                        hoverColor="#1B2D42"
                        onChange={this.handlePassword}/>
                    <Button
                        submit
                        visible={this.state.password.valid}>
                        Reset Password
                    </Button>
                </Form>
                <LoginContainer />
            </AuthenticationLayout>
        )
    }

    private getEmail() {
        return this.urlParams.has("email") ? this.urlParams.get("email") as string : "";
    }

    private getToken() {
        return this.urlParams.has("token") ? this.urlParams.get("token") as string : "";
    }

    private handlePassword(password: FormValue<string>) {
        this.setState({ password })
    }

    private async handleSubmit() {
        if (this.state.password.valid) {
            this.setState({
                send: true
            })
        }
    }

    private onComplete() {
        this.setState({
            send: false
        })
    }
}