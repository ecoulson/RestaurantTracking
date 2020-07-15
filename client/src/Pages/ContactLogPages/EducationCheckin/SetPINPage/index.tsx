import React from "react";
import PageLayout from "../../../../Layouts/PageLayout";
import ISetPINPageProps from "./ISetPINPageProps";
import Logo from "../../../../Components/Logo";
import OrganizationName from "../../OrganizationName";
import Form from "../../../../Components/Form";
import Instructions from "../../Instructions";
import Button from "../../../../Components/Button";
import PINInput from "../../../../Components/PINInput";
import ISetPINPageState from "./ISetPINPageState";
import IResponse from "../../../../API/IResponse";
import IGetOrganizationNameResponse from "../../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import GetOrganizationNameRequest from "../../../../API/GetOrganizationNameRequest";
import Cookie from "../../../../lib/Cookie";
import LegalContainer from "../../LegalContainer";
import FormValue from "../../../../Components/FormInput/FormValue";
import IFormValue from "../../../../Components/FormInput/IFormValue";
import SlideSwitch from "../../../../Components/SlideSwitch";
import Icon from "../../../../Components/Icon";
import IconType from "../../../../Components/Icon/IconTypes";
import PasswordInput from "../../../../Components/PasswordInput";
import RegisterOrganizationUserRequest from "../../../../API/RegisterOrganizationUserRequest";

export default class SetPINPage extends React.Component<ISetPINPageProps, ISetPINPageState> {
    constructor(props : ISetPINPageProps) {
        super(props);
        this.state = {
            password: new FormValue<string>("", false),
            organizationName: "",
            send: false,
            passwordInputType: 0
        }

        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onError = this.onError.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordInputType = this.handlePasswordInputType.bind(this);
    }

    render() {
        return (
            <PageLayout pageTitle="Set PIN">
                <GetOrganizationNameRequest
                    send
                    onComplete={this.onOrganizationName}
                    organizationId={this.props.match.params.organizationId}/>
                <RegisterOrganizationUserRequest 
                    send={this.state.send}
                    onComplete={this.onComplete}
                    onError={this.onError}
                    organizationId={this.props.match.params.organizationId}
                    email={Cookie.getCookie("pin_email") as string}
                    password={this.state.password.value} />
                <Logo dark />
                <OrganizationName>{this.state.organizationName}</OrganizationName>
                <Form onSubmit={this.onSubmit}>
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

    handlePasswordInputType(passwordInputType : number) {
        this.setState({ passwordInputType })
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
            send: false
        })
    }

    onError() {
        this.setState({
            send: false
        })
    }
}