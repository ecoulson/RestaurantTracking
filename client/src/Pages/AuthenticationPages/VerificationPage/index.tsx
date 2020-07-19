import React from "react";
import AppHistory from "../../../AppHistory";
import LoginContainer from "../../../Layouts/AuthenticationLayout/LoginContainer";
import IVerificationPageProps from "./IVerificationPageProps";
import AuthenticationLayout from "../../../Layouts/AuthenticationLayout";
import VerificationRequest from "../../../API/VerificationRequest";
import IVerificationPageState from "./IVerificationPageState";

export default class VerificationPage extends React.Component<IVerificationPageProps, IVerificationPageState> {
    private urlParams : URLSearchParams;

    constructor(props: IVerificationPageProps) {
        super(props);
        this.state = {
            shouldLogin: false
        }

        this.urlParams = new URLSearchParams(window.location.search);
        this.onComplete = this.onComplete.bind(this);
    }

    render() {
        return (
            <AuthenticationLayout pageTitle="Verifying Account...">
                <VerificationRequest
                    redirect
                    send 
                    onComplete={this.onComplete} 
                    token={this.getToken()}
                    email={this.getEmail()}/>
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

    private onComplete() {
        this.props.showSuccess("Successfully verified account", 3000);
        AppHistory.push("/login");
    }
}