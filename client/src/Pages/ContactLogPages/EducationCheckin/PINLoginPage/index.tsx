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
import PasswordInput from "../../../../Components/PasswordInput";
import SlideSwitch from "../../../../Components/SlideSwitch";
import Icon from "../../../../Components/Icon";
import IconType from "../../../../Components/Icon/IconTypes";

export default class PINLoginPage extends React.Component<IPinLoginPageProps, IPINLoginPageState> {
    constructor(props : IPinLoginPageProps) {
        super(props);
        this.state = {
            organizationName: "",
            password: new FormValue<string>("", false),
            send: false,
            passwordInputType: 0
        }

        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onError = this.onError.bind(this);
        this.handlePasswordInputType = this.handlePasswordInputType.bind(this);
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
                    password={this.state.password.value} />
                <Logo dark />
                <OrganizationName>{this.state.organizationName}</OrganizationName>
                <Form onSubmit={this.onSubmit}>
                    <SlideSwitch onChange={this.handlePasswordInputType}>
                        <Icon width={25} height={25} icon={IconType.AppsOutline} color="white" />
                        <Icon width={25} height={25} icon={IconType.SortAZ} color="white" />
                    </SlideSwitch>
                    {this.getInput()}
                    <ResetPINLink organizationId={this.props.match.params.organizationId} />
                    <Button dark submit>Submit</Button>
                </Form>
                <LegalContainer />
            </PageLayout>
        )
    }

    private handlePasswordInputType(passwordInputType : number) {
        this.setState({ passwordInputType })
    }

    private getInput() {
        return this.state.passwordInputType === 0 ?
            <>
                <PINInput onChange={this.handlePasswordChange}/>
                <Instructions>Enter PIN for <b>{Cookie.getCookie("pin_email")}</b></Instructions>
            </> :
            <>
                <PasswordInput id="password" dark iconColor="#707070" hoverColor="white" onChange={this.handlePasswordChange}/>
                <Instructions>Enter password for <b>{Cookie.getCookie("pin_email")}</b></Instructions>
            </>
    }

    onOrganizationName(response : IResponse<IGetOrganizationNameResponse>) {
        this.setState({
            organizationName: response.data.organizationName
        })
    }

    handlePasswordChange(password : FormValue<string>) {
        this.setState({ password })
    }

    onSubmit() {
        this.setState({
            send: true
        })
    }

    onLogin(response : IResponse<IPINLoginResponse>) {
        Cookie.eraseCookie("checkInId");
        Cookie.eraseCookie("timeCheckedIn");
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