import React from "react";
import AuthenticationLayoutText from "../../../Layouts/AuthenticationLayout/AuthenticationLayoutText";
import LoginContainer from "../../../Layouts/AuthenticationLayout/LoginContainer";
import AuthenticationLayout from "../../../Layouts/AuthenticationLayout";
import CancelPasswordRecoveryRequest from "../../../API/CancelPasswordRecoveryRequest";

export default class CancelPasswordRecoveryPage extends React.Component {
    private urlParams : URLSearchParams;

    constructor(props: {}) {
        super(props);
        this.urlParams = new URLSearchParams();
    }

    render() {
        return (
            <AuthenticationLayout pageTitle="Canceled Password Recovery">
                <CancelPasswordRecoveryRequest 
                    send
                    email={this.getEmail()}
                    token={this.getToken()}
                    />
                <AuthenticationLayoutText>Password recovery has been canceled</AuthenticationLayoutText>
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