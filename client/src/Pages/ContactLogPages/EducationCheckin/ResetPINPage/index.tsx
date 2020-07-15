import React from "react";
import PageLayout from "../../../../Layouts/PageLayout";
import IResetPINPageProps from "./IResetPINPageProps";
import Logo from "../../../../Components/Logo";
import OrganizationName from "../../OrganizationName";
import Form from "../../../../Components/Form";
import Instructions from "../../Instructions";
import Button from "../../../../Components/Button";
import PINInput from "../../../../Components/PINInput";
import IResetPINPageState from "./IResetPINPageState";
import IResponse from "../../../../API/IResponse";
import IGetOrganizationNameResponse from "../../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import GetOrganizationNameRequest from "../../../../API/GetOrganizationNameRequest";
import LegalContainer from "../../LegalContainer";
import FormValue from "../../../../Components/FormInput/FormValue";
import IFormValue from "../../../../Components/FormInput/IFormValue";
import PasswordInput from "../../../../Components/PasswordInput";
import Cookie from "../../../../lib/Cookie";
import SlideSwitch from "../../../../Components/SlideSwitch";
import IconType from "../../../../Components/Icon/IconTypes";
import Icon from "../../../../Components/Icon";
import ResetPasswordRequest from "../../../../API/ResetPasswordRequest";
import ConfirmPasswordRecoveryRequest from "../../../../API/ConfirmPasswordRecoveryRequest";
import AppHistory from "../../../../AppHistory";

export default class ResetPINPage extends React.Component<IResetPINPageProps, IResetPINPageState> {
    private urlParams : URLSearchParams;

    constructor(props : IResetPINPageProps) {
        super(props);
        this.state = {
            password: new FormValue<string>("", false),
            organizationName: "",
            passwordInputType: 0,
            send: false
        }
        this.urlParams = new URLSearchParams(this.props.location.search);

        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onError = this.onError.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordInputType = this.handlePasswordInputType.bind(this);
    }

    render() {
        return (
            <PageLayout pageTitle="Reset PIN">
                <ConfirmPasswordRecoveryRequest 
                    send
                    email={this.urlParams.get("email") as string}
                    token={this.urlParams.get("token") as string}/>
                <GetOrganizationNameRequest
                    send
                    onComplete={this.onOrganizationName}
                    organizationId={this.props.match.params.organizationId}/>
                <Logo dark />
                <OrganizationName>{this.state.organizationName}</OrganizationName>
                <Form onSubmit={this.onSubmit}>
                    <ResetPasswordRequest 
                        send={this.state.send}
                        onComplete={this.onComplete}
                        onError={this.onError}
                        email={this.urlParams.get("email") as string}
                        token={this.urlParams.get("token") as string}
                        password={this.state.password.value} />
                    <SlideSwitch onChange={this.handlePasswordInputType}>
                        <Icon width={25} height={25} icon={IconType.AppsOutline} color="white" />
                        <Icon width={25} height={25} icon={IconType.SortAZ} color="white" />
                    </SlideSwitch>
                    {this.getInput()}
                    <Button submit>Submit</Button>
                </Form>
                <LegalContainer />
            </PageLayout>
        )
    }

    onOrganizationName(response : IResponse<IGetOrganizationNameResponse>) {
        this.setState({ organizationName : response.data.organizationName })
    }

    handlePasswordChange(PIN : IFormValue<string>) {
        this.setState({ password: PIN })
    }

    getInput() {
        return this.state.passwordInputType === 0 ?
            <>
                <PINInput onChange={this.handlePasswordChange}/>
                <Instructions>Enter a 4 digit PIN for <b>{Cookie.getCookie("pin_email")}</b></Instructions>
            </> :
            <>
                <PasswordInput dark iconColor="#707070" hoverColor="white" registering onChange={this.handlePasswordChange}/>
                <Instructions>Enter a password for <b>{Cookie.getCookie("pin_email")}</b></Instructions>
            </>
    }

    handlePasswordInputType(passwordInputType : number) {
        this.setState({ passwordInputType });
    }

    onSubmit() {
        if (this.state.password.valid) {
            this.setState({
                send: true
            })
        }
    }

    onComplete() {
        this.props.showSuccess("Succesfully reset password", 500);
        AppHistory.push(`/check-in/${this.props.match.params.organizationId}/login`)
    }

    onError() {
        this.setState({
            send: false
        })
    }
}