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

export default class ResetPINPage extends React.Component<IResetPINPageProps, IResetPINPageState> {
    private urlParams : URLSearchParams;

    constructor(props : IResetPINPageProps) {
        super(props);
        this.state = {
            PIN: new FormValue<string>("", false),
            organizationName: "",
            send: false
        }
        this.urlParams = new URLSearchParams(this.props.location.search);

        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handlePINChange = this.handlePINChange.bind(this);
    }

    render() {
        return (
            <PageLayout pageTitle="Reset PIN">
                <GetOrganizationNameRequest
                    send
                    onComplete={this.onOrganizationName}
                    organizationId={this.props.match.params.organizationId}/>
                <Logo dark />
                <OrganizationName>{this.state.organizationName}</OrganizationName>
                <Form onSubmit={this.onSubmit}>
                    <PINInput onChange={this.handlePINChange}/>
                    <Instructions>Enter a 4 digit PIN to reset the PIN for <b>{this.urlParams.get("email")}</b></Instructions>
                    <Button submit>Submit</Button>
                </Form>
                <LegalContainer />
            </PageLayout>
        )
    }

    onOrganizationName(response : IResponse<IGetOrganizationNameResponse>) {
        this.setState({ organizationName : response.data.organizationName })
    }

    handlePINChange(PIN : IFormValue<string>) {
        this.setState({ PIN })
    }

    onSubmit() {
        if (this.state.PIN.valid) {
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