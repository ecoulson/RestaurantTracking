import React from "react";
import IVerifyPINPageProps from "./IVerifyPINPageProps";
import Form from "../../../../Components/Form";
import Instructions from "../../Components/Instructions";
import Button from "../../../../Components/Button";
import PINInput from "../../../../Components/PINInput";
import IVerifyPINPageState from "./IVerifyPINPageState";
import Cookie from "../../../../lib/Cookie";
import FormValue from "../../../../Components/FormInput/FormValue";
import IFormValue from "../../../../Components/FormInput/IFormValue";
import OrganizationAccountVerificationRequest from "../../../../API/OrganizationAccountVerificationRequest";
import AppHistory from "../../../../AppHistory";
import { Link } from "react-router-dom";
import "./index.css";

export default class VerifyPINPage extends React.Component<IVerifyPINPageProps, IVerifyPINPageState> {
    constructor(props : IVerifyPINPageProps) {
        super(props);
        this.state = {
            verificationCode: new FormValue<string>("", false),
            send: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onError = this.onError.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
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
                    password={this.state.verificationCode.value} />
                <Form onSubmit={this.onSubmit}>
                    <PINInput onChange={this.handleCodeChange}/>
                    <Instructions>
                        Enter the 4 digit PIN from the verification email sent to <b>{Cookie.getCookie("pin_email")}</b> or <Link 
                            className="skip-verification-link" 
                            to={`/check-in/${this.props.match.params.organizationId}/verify-account`}>
                                Resend Verification Code
                        </Link>
                    </Instructions>
                    <Instructions>
                        <Link 
                            className="skip-verification-link" 
                            to={`/check-in/${this.props.match.params.organizationId}/`}>
                                Skip This Step
                        </Link>
                    </Instructions>
                    <Button dark submit>Submit</Button>
                </Form>
            </>
        )
    }

    handleCodeChange(password : IFormValue<string>) {
        this.setState({ verificationCode: password })
    }

    onSubmit() {
        if (this.state.verificationCode.valid) {
            this.setState({
                send: true
            })
        }
    }

    onComplete() {
        const urlParams = new URLSearchParams(this.props.location.search as string)
        if (urlParams.has("building")) {
            AppHistory.push(`/check-in/${this.props.match.params.organizationId}/scan/${urlParams.get("building")}`)
        } else {
            AppHistory.push(`/check-in/${this.props.match.params.organizationId}/`)
        }
    }

    onError() {
        this.setState({
            send: false
        })
    }
}