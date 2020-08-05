import React from "react";
import IVerifyPINAccountPageProps from "./IVerifyPINAccountPageProps";
import OrganizationName from "../Components/OrganizationName";
import IVerifyPINAccountPageState from "./IVerifyPINAccountPageState";
import GetOrganizationNameRequest from "../../../API/GetOrganizationNameRequest";
import IResponse from "../../../API/IResponse";
import IGetOrganizationNameResponse from "../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import Form from "../../../Components/Form";
import Button from "../../../Components/Button";
import Instructions from "../Components/Instructions";
import EmailInput from "../../../Components/EmailInput";
import IFormValue from "../../../Components/FormInput/IFormValue";
import FormValue from "../../../Components/FormInput/FormValue";
import SendPINVerificationRequest from "../../../API/SendPINVerificationRequest";
import CheckInLayout from "../../../Layouts/CheckInLayout";
import AppHistory from "../../../AppHistory";

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
            <CheckInLayout organizationId={this.props.match.params.organizationId} pageTitle="Verify PIN Account">
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
                <OrganizationName organizationId={this.props.match.params.organizationId} />
                <Instructions>Check your email to verify your account</Instructions>
                <Form onSubmit={this.onSubmit}>
                    <EmailInput id="email" dark onChange={this.onEmailChange} iconColor="#707070" hoverColor="white" />
                    <Instructions>Enter the email associated with your PIN to resend your verification email</Instructions>
                    <Button dark submit>Resend</Button>
                </Form>
            </CheckInLayout>
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
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/verify-code/`)
    }
}