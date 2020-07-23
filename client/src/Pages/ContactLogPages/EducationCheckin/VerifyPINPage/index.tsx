import React from "react";
import PageLayout from "../../../../Layouts/PageLayout";
import IVerifyPINPageProps from "./IVerifyPINPageProps";
import Logo from "../../../../Components/Logo";
import OrganizationName from "../../OrganizationName";
import Form from "../../../../Components/Form";
import Instructions from "../../Instructions";
import Button from "../../../../Components/Button";
import PINInput from "../../../../Components/PINInput";
import IVerifyPINPageState from "./IVerifyPINPageState";
import IResponse from "../../../../API/IResponse";
import IGetOrganizationNameResponse from "../../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import GetOrganizationNameRequest from "../../../../API/GetOrganizationNameRequest";
import Cookie from "../../../../lib/Cookie";
import LegalContainer from "../../LegalContainer";
import FormValue from "../../../../Components/FormInput/FormValue";
import IFormValue from "../../../../Components/FormInput/IFormValue";
import OrganizationAccountVerificationRequest from "../../../../API/OrganizationAccountVerificationRequest";
import AppHistory from "../../../../AppHistory";
import PINLoginRequest from "../../../../API/PINLoginRequest";
import ILoginResponse from "../../../../API/LoginRequest/ILoginResponse";

export default class VerifyPINPage extends React.Component<IVerifyPINPageProps, IVerifyPINPageState> {
    constructor(props : IVerifyPINPageProps) {
        super(props);
        this.state = {
            password: new FormValue<string>("", false),
            organizationName: "",
            send: false,
            shouldLogin: false
        }

        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onError = this.onError.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    render() {
        return (
            <PageLayout pageTitle="Verify Account">
                <GetOrganizationNameRequest
                    send
                    onComplete={this.onOrganizationName}
                    organizationId={this.props.match.params.organizationId}/>
                <OrganizationAccountVerificationRequest
                    send={this.state.send}
                    redirect
                    organizationId={this.props.match.params.organizationId}
                    email={Cookie.getCookie("pin_email") as string}
                    onComplete={this.onComplete}
                    onError={this.onError}
                    password={this.state.password.value} />
                <PINLoginRequest
                    send={this.state.shouldLogin}
                    organizationId={this.props.match.params.organizationId}
                    email={Cookie.getCookie("pin_email") as string}
                    password={this.state.password.value}
                    onError={this.onError}
                    onComplete={this.onLogin} />
                <Logo dark />
                <OrganizationName>{this.state.organizationName}</OrganizationName>
                <Form onSubmit={this.onSubmit}>
                    <PINInput onChange={this.handlePasswordChange}/>
                    <Instructions>Enter the 4 digit PIN from the verification email sent to <b>{Cookie.getCookie("pin_email")}</b></Instructions>
                    <Button dark submit>Submit</Button>
                </Form>
                <LegalContainer />
            </PageLayout>
        )
    }

    onOrganizationName(response : IResponse<IGetOrganizationNameResponse>) {
        this.setState({ organizationName : response.data.organizationName })
    }

    handlePasswordChange(password : IFormValue<string>) {
        this.setState({ password: password })
    }

    onSubmit() {
        if (this.state.password.valid) {
            this.setState({
                send: true
            })
        }
    }

    onComplete() {
        this.setState({
            shouldLogin: true
        })
    }

    onLogin(response : IResponse<ILoginResponse>) {
        Cookie.setCookie("token", response.data.token, 365);
        this.props.showSuccess("Successfully verified user", 5000)
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/`)
    }

    onError() {
        this.setState({
            send: false,
            shouldLogin: false
        })
    }
}