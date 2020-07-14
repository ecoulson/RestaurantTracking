import React from "react";
import IPinLoginPageProps from "./IPINLoginPageProps";
import IPINLoginPageState from "./IPINLoginPageState";
import PageLayout from "../../../../Layouts/PageLayout";
import Logo from "../../../../Components/Logo";
import GetOrganizationNameRequest from "../../../../API/GetOrganizationNameRequest";
import IGetOrganizationNameResponse from "../../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import IResponse from "../../../../API/IResponse";
import OrganizationName from "../../OrganizationName";
import Instructions from "../../Instructions";
import Form from "../../../../Components/Form";
import Button from "../../../../Components/Button";
import PINInput from "../../../../Components/PINInput";
import Cookie from "../../../../lib/Cookie";
import AppHistory from "../../../../AppHistory";
import PINLoginRequest from "../../../../API/PINLoginRequest";
import IPINLoginResponse from "../../../../API/PINLoginRequest/IPINLoginResponse";
import LegalContainer from "../../LegalContainer";
import FormValue from "../../../../Components/FormInput/FormValue";
import ResetPINLink from "./ResetPINLink";

export default class PINLoginPage extends React.Component<IPinLoginPageProps, IPINLoginPageState> {
    constructor(props : IPinLoginPageProps) {
        super(props);
        this.state = {
            organizationName: "",
            PIN: new FormValue<string>("", false),
            send: false
        }

        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.handlePinChange = this.handlePinChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onError = this.onError.bind(this);
    }

    render() {
        return (
            <PageLayout pageTitle="Set Pin">
                <GetOrganizationNameRequest 
                    send 
                    onComplete={this.onOrganizationName}
                    organizationId={this.props.match.params.organizationId} />
                <PINLoginRequest
                    send={this.state.send}
                    email={Cookie.getCookie("pin_email") as string}
                    organizationId={this.props.match.params.organizationId}
                    redirect
                    onComplete={this.onLogin}
                    onError={this.onError}
                    password={this.state.PIN.value} />
                <Logo dark />
                <OrganizationName>{this.state.organizationName}</OrganizationName>
                <Form onSubmit={this.onSubmit}>
                    <PINInput onChange={this.handlePinChange}/>
                    <Instructions>Enter your 4 digit PIN</Instructions>
                    <ResetPINLink />
                    <Button submit>Submit</Button>
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

    handlePinChange(PIN : FormValue<string>) {
        this.setState({ PIN })
    }

    onSubmit() {
        if (this.state.PIN.valid) {
            this.setState({
                send: true
            })
        }
    }

    onLogin(response : IResponse<IPINLoginResponse>) {
        Cookie.setCookie("token", response.data.token);
        if (response.data.verified) {
            AppHistory.push(`/check-in/${this.props.match.params.organizationId}/${this.props.location.search}`)
        } else {
            AppHistory.push(`/check-in/${this.props.match.params.organizationId}/verify-account/${this.props.location.search}`)
        }
    }

    onError() {
        this.setState({
            send: false
        })
    }
}