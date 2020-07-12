import React from "react";
import AppHistory from "../../../AppHistory";
import LoginContainer from "../../../Layouts/AuthenticationLayout/LoginContainer";
import AuthenticationLayout from "../../../Layouts/AuthenticationLayout";
import ConfirmPasswordRecoveryRequest from "../../../API/ConfirmPasswordRecoveryRequest";

export default class ConfirmPasswordRecoveryPage extends React.Component {
    private urlParams : URLSearchParams;

    constructor(props: {}) {
        super(props);
        this.urlParams = new URLSearchParams(window.location.search);
        this.handleComplete = this.handleComplete.bind(this);
    }

    render() {
        return (
            <AuthenticationLayout pageTitle="Confirmed Recovery">
                <ConfirmPasswordRecoveryRequest
                    send
                    email={this.getEmail()}
                    token={this.getToken()}
                    onComplete={this.handleComplete} />
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

    private handleComplete() {
        AppHistory.push(this.getResetPasswordPath(this.getEmail(), this.getToken()))
    }

    private getResetPasswordPath(email: string, token: string) {
        return `/reset-password?email=${email}&token=${token}`
    }
}