import React from "react";
import AuthenticationLayoutText from "../../../Layouts/AuthenticationLayout/AuthenticationLayoutText";
import LoginContainer from "../../../Layouts/AuthenticationLayout/LoginContainer";
import AuthenticationLayout from "../../../Layouts/AuthenticationLayout";
import SpamRegistrationRequest from "../../../API/SpamRegistrationRequest";

export default class SpamRegistrationPage extends React.Component {
    private urlParams : URLSearchParams;

    constructor(props: {}) {
        super(props);
        this.urlParams = new URLSearchParams(window.location.search);
    }

    render() {
        return (
            <AuthenticationLayout pageTitle="Spam Registration">
                <SpamRegistrationRequest
                    send
                    email={this.getEmail()}
                    token={this.getToken()}/>
                <AuthenticationLayoutText>We are removing your registration from our system.</AuthenticationLayoutText>
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
}