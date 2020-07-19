import React from "react";
import PageLayout from "../../../../Layouts/PageLayout";
import Logo from "../../../../Components/Logo";
import IVerifyPINAccountPageProps from "./IVerifyPINAccountPageProps";
import OrganizationName from "../../OrganizationName";
import IVerifyPINAccountPageState from "./IVerifyPINAccountPageState";
import GetOrganizationNameRequest from "../../../../API/GetOrganizationNameRequest";
import IResponse from "../../../../API/IResponse";
import IGetOrganizationNameResponse from "../../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import Form from "../../../../Components/Form";
import Button from "../../../../Components/Button";
import Instructions from "../../Instructions";
import EmailInput from "../../../../Components/EmailInput";
import IFormValue from "../../../../Components/FormInput/IFormValue";
import FormValue from "../../../../Components/FormInput/FormValue";
import SendPINVerificationRequest from "../../../../API/SendPINVerificationRequest";
import LegalContainer from "../../LegalContainer";

export default class VerifyPINAccountPage extends React.Component<IVerifyPINAccountPageProps, IVerifyPINAccountPageState> {
    constructor(props : IVerifyPINAccountPageProps) {
        super(props);
        this.state = {
            organizationName: "",
            send: false,
            email: new FormValue("", false)
        }
        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onComplete = this.onComplete.bind(this);
    }

    render() {
        return (
            <PageLayout pageTitle="Verify PIN Account">
                <GetOrganizationNameRequest
                    organizationId={this.props.match.params.organizationId}
                    onComplete={this.onOrganizationName}
                    send />
                <SendPINVerificationRequest 
                    send={this.state.send}
                    organizationId={this.props.match.params.organizationId}
                    email={this.state.email.value}
                    onComplete={this.onComplete}
                    onError={this.onComplete} />
                <Logo dark />
                <OrganizationName>{this.state.organizationName}</OrganizationName>
                <Instructions>Check your email to verify your account</Instructions>
                <Form onSubmit={this.onSubmit}>
                    <EmailInput dark onChange={this.onEmailChange} iconColor="#707070" hoverColor="white" />
                    <Instructions>Enter the email associated with your PIN to resend your verification email</Instructions>
                    <Button dark submit>Resend</Button>
                </Form>
                <LegalContainer />
            </PageLayout>
        )
    }

    onOrganizationName(response : IResponse<IGetOrganizationNameResponse>) {
        this.setState({
            organizationName: response.data.organizationName
        })
    }

    onEmailChange(email: IFormValue<string>) {
        this.setState({ email })
    }

    onSubmit() {
        if (this.state.email.valid) {
            this.setState({
                send: true
            })
        }
    }

    onComplete() {
        this.setState({
            send: false
        })
    }
}