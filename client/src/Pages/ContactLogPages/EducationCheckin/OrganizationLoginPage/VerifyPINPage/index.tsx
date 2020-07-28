import React from "react";
import IVerifyPINPageProps from "./IVerifyPINPageProps";
import Form from "../../../../../Components/Form";
import Instructions from "../../../Instructions";
import Button from "../../../../../Components/Button";
import PINInput from "../../../../../Components/PINInput";
import IVerifyPINPageState from "./IVerifyPINPageState";
import IResponse from "../../../../../API/IResponse";
import Cookie from "../../../../../lib/Cookie";
import FormValue from "../../../../../Components/FormInput/FormValue";
import IFormValue from "../../../../../Components/FormInput/IFormValue";
import OrganizationAccountVerificationRequest from "../../../../../API/OrganizationAccountVerificationRequest";
import AppHistory from "../../../../../AppHistory";
import PINLoginRequest from "../../../../../API/PINLoginRequest";
import ILoginResponse from "../../../../../API/LoginRequest/ILoginResponse";

export default class VerifyPINPage extends React.Component<IVerifyPINPageProps, IVerifyPINPageState> {
    constructor(props : IVerifyPINPageProps) {
        super(props);
        this.state = {
            password: new FormValue<string>("", false),
            send: false,
            shouldLogin: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onError = this.onError.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    render() {
        return (
            <>
                <OrganizationAccountVerificationRequest
                    send={this.state.send}
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
                <Form onSubmit={this.onSubmit}>
                    <PINInput onChange={this.handlePasswordChange}/>
                    <Instructions>Enter the 4 digit PIN from the verification email sent to <b>{Cookie.getCookie("pin_email")}</b></Instructions>
                    <Button dark submit>Submit</Button>
                </Form>
            </>
        )
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
        const urlParams = new URLSearchParams(this.props.location.search as string)
        if (urlParams.has("building")) {
            AppHistory.push(`/check-in/${this.props.match.params.organizationId}/scan/${urlParams.get("building")}`)
        } else {
            AppHistory.push(`/check-in/${this.props.match.params.organizationId}/`)
        }
    }

    onError() {
        this.setState({
            send: false,
            shouldLogin: false
        })
    }
}