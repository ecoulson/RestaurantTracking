import React from "react";
import PageLayout from "../../../../Layouts/PageLayout";
import Logo from "../../../../Components/Logo";
import IVerifyPINAccountPageProps from "./IVerifyPINAccountPageProps";
import OrganizationName from "../../OrganizationName";
import IVerifyPINAccountPageState from "./IVerifyPINAccountPageState";
import GetOrganizationNameRequest from "../../../../API/GetOrganizationNameRequest";
import IResponse from "../../../../API/IResponse";
import IGetOrganizationNameResponse from "../../../../API/GetOrganizationNameRequest/IGetOrganizationNameResponse";
import Form from "../../../../Components/Form";
import Button from "../../../../Components/Button";
import Instructions from "../../Instructions";
import EmailInput from "../../../../Components/EmailInput";
import IFormValue from "../../../../Components/FormInput/IFormValue";
import FormValue from "../../../../Components/FormInput/FormValue";

export default class VerifyPINAccountPage extends React.Component<IVerifyPINAccountPageProps, IVerifyPINAccountPageState> {
    constructor(props : IVerifyPINAccountPageProps) {
        super(props);
        this.state = {
            organizationName: "",
            send: true,
            email: new FormValue("", false)
        }
        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
    }

    render() {
        return (
            <PageLayout pageTitle="Verify PIN Account">
                <GetOrganizationNameRequest
                    organizationId={this.props.match.params.organizationId}
                    onComplete={this.onOrganizationName}
                    send />
                <Logo dark />
                <OrganizationName>{this.state.organizationName}</OrganizationName>
                <Form>
                    <EmailInput dark onChange={this.onEmailChange} iconColor="#707070" hoverColor="white" />
                    <Instructions>Enter the email associated with your PIN to resend your verification email</Instructions>
                    <Button submit>Resend</Button>
                </Form>
            </PageLayout>
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

    }
}