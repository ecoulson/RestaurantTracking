import React from "react";
import IPINEmailPageProps from "./IPINEmailPageProps";
import Form from "../../../../Components/Form";
import EmailInput from "../../../../Components/EmailInput";
import IPINEmailPageState from "./IPINEmailPageState";
import FormValue from "../../../../Components/FormInput/FormValue";
import IFormValue from "../../../../Components/FormInput/IFormValue";
import Button from "../../../../Components/Button";
import OrganizationAccountExistsRequest from "../../../../API/OrganizationAccountExistsRequest";
import Instructions from "../../Components/Instructions";
import IOrganizationAccountExistsResponse from "../../../../API/OrganizationAccountExistsRequest/IOrganizationAccountExistsResponse";
import IResponse from "../../../../API/IResponse";
import Cookie from "../../../../lib/Cookie";

export default class PINEmailPage extends React.Component<IPINEmailPageProps, IPINEmailPageState> {
    constructor(props : IPINEmailPageProps) {
        super(props);
        this.state = {
            email: new FormValue<string>("", false),
            send: false,
            register: false
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSignOn = this.onSignOn.bind(this);
    }

    render() {
        return (
            <>
                <OrganizationAccountExistsRequest 
                    send={this.state.send}
                    onComplete={this.onSignOn}
                    email={this.state.email.value}
                    organizationId={this.props.match.params.organizationId} />
                <Form onSubmit={this.onSubmit}>
                    <EmailInput dark id="email" iconColor="#707070" hoverColor="#FFFFFF" onChange={this.handleEmailChange}/>
                    <Instructions>First time here or got logged out? Please enter your school email address.</Instructions>
                    <Button dark submit>Submit</Button>
                </Form>
            </>
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

    onSignOn(response : IResponse<IOrganizationAccountExistsResponse>) {
        Cookie.setCookie("pin_email", this.state.email.value, 365)
        if (!response.data.isRegistered) {
            this.props.gotoRegisterScreen();
        } else {
            this.props.gotoPasswordScreen();
        }
    }
}