import React from "react";
import IPINEmailPageProps from "./IPINEmailPageProps";
import Form from "../../../../Components/Form";
import EmailInput from "../../../../Components/EmailInput";
import IPINEmailPageState from "./IPINEmailPageState";
import FormValue from "../../../../Components/FormInput/FormValue";
import IFormValue from "../../../../Components/FormInput/IFormValue";
import Button from "../../../../Components/Button";
import OrganizationAccountExistsRequest from "../../../../API/OrganizationAccountExistsRequest";
import Instructions from "../../Instructions";
import IOrganizationAccountExistsResponse from "../../../../API/OrganizationAccountExistsRequest/IOrganizationAccountExistsResponse";
import AppHistory from "../../../../AppHistory";
import IResponse from "../../../../API/IResponse";
import OrganizationName from "../../OrganizationName";
import GetOrganizationNameRequest from "../../../../API/GetOrganizationNameRequest";
import IGetOrganizationNameResponse from "../../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import Cookie from "../../../../lib/Cookie";
import RegisterOrganizationUserRequest from "../../../../API/RegisterOrganizationUserRequest";
import CheckInLayout from "../../../../Layouts/CheckInLayout";

export default class PINEmailPage extends React.Component<IPINEmailPageProps, IPINEmailPageState> {
    constructor(props : IPINEmailPageProps) {
        super(props);
        this.state = {
            organizationName: "",
            email: new FormValue<string>("", false),
            send: false,
            register: false
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSignOn = this.onSignOn.bind(this);
        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.onError = this.onError.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }

    render() {
        return (
            <CheckInLayout organizationId={this.props.match.params.organizationId} pageTitle="Login">
                <OrganizationAccountExistsRequest 
                    send={this.state.send}
                    onComplete={this.onSignOn}
                    onError={this.onError}
                    email={this.state.email.value}
                    organizationId={this.props.match.params.organizationId} />
                <RegisterOrganizationUserRequest 
                    send={this.state.register}
                    onComplete={this.onRegister}
                    onError={this.onError}
                    organizationId={this.props.match.params.organizationId}
                    email={Cookie.getCookie("pin_email") as string} />
                <GetOrganizationNameRequest 
                    send
                    organizationId={this.props.match.params.organizationId} 
                    onComplete={this.onOrganizationName}/>
                <OrganizationName>{this.state.organizationName}</OrganizationName>
                <Form onSubmit={this.onSubmit}>
                    <EmailInput dark id="email" iconColor="#707070" hoverColor="#FFFFFF" onChange={this.handleEmailChange}/>
                    <Instructions>First time here or got logged out? Please enter your school email address.</Instructions>
                    <Button dark submit>Submit</Button>
                </Form>
            </CheckInLayout>
        )
    }

    handleEmailChange(email : IFormValue<string>) {
        this.setState({ email });
    }

    onSubmit() {
        if (this.state.email.valid) {
            this.setState({
                send: true
            })
        }
    }

    onOrganizationName(response : IResponse<IGetOrganizationNameResponse>) {
        this.setState({ organizationName: response.data.organizationName })
    }

    onSignOn(response : IResponse<IOrganizationAccountExistsResponse>) {
        Cookie.setCookie("pin_email", this.state.email.value, 365)
        if (!response.data.isRegistered) {
            this.setState({
                register: true
            })
        } else if (!response.data.isVerified) {
            AppHistory.push(`/check-in/${this.props.match.params.organizationId}/verify-account/${this.props.location.search}`)
        } else {
            AppHistory.push(`/check-in/${this.props.match.params.organizationId}/login-password/${this.props.location.search}`)
        }
    }

    onRegister() {
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/verify-account/${this.props.location.search}`)
    }

    onError() {
        this.setState({
            send: false,
            register: false
        })
    }
}