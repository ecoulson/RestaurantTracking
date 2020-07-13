import React from "react";
import PageLayout from "../../../../Layouts/PageLayout";
import Logo from "../../../../Components/Logo";
import IPinEmailPageProps from "./IPinEmailPageProps";
import Form from "../../../../Components/Form";
import EmailInput from "../../../../Components/EmailInput";
import IPinEmailPageState from "./IPinEmailPageState";
import FormValue from "../../../../Components/FormInput/FormValue";
import IFormValue from "../../../../Components/FormInput/IFormValue";
import Button from "../../../../Components/Button";
import HasOrganizationAccountRequest from "../../../../API/HasOrganizationAccountRequest";
import LegalContainer from "../../LegalContainer";
import Instructions from "../../Instructions";

export default class PinEmailPage extends React.Component<IPinEmailPageProps, IPinEmailPageState> {
    constructor(props : IPinEmailPageProps) {
        super(props);
        this.state = {
            email: new FormValue<string>("", false),
            send: false
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onComplete = this.onComplete.bind(this);
    }

    render() {
        return (
            <PageLayout pageTitle="Login">
                <HasOrganizationAccountRequest 
                    send={this.state.send}
                    onComplete={this.onComplete}
                    onError={this.onComplete}
                    email={this.state.email.value}
                    organizationId={this.props.match.params.organizationId}
                    />
                <Logo dark />
                <Form onSubmit={this.onSubmit}>
                    <EmailInput dark iconColor="#707070" hoverColor="#FFFFFF" onChange={this.handleEmailChange}/>
                    <Instructions>First time here or got logged out? Please enter your school email address.</Instructions>
                    <Button submit>Submit</Button>
                </Form>
                <LegalContainer />
            </PageLayout>
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

    onComplete() {
        this.setState({
            send: false
        })
    }
}