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

export default class SetPINPage extends React.Component<ISetPINPageProps, ISetPINPageState> {
    constructor(props : ISetPINPageProps) {
        super(props);
        this.state = {
            PIN: new FormValue<string>("", false),
            organizationName: "",
            send: false
        }

        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handlePINChange = this.handlePINChange.bind(this);
    }

    render() {
        return (
            <PageLayout pageTitle="Set PIN">
                <GetOrganizationNameRequest
                    send
                    onComplete={this.onOrganizationName}
                    organizationId={this.props.match.params.organizationId}/>
                <Logo dark />
                <OrganizationName>{this.state.organizationName}</OrganizationName>
                <Form onSubmit={this.onSubmit}>
                    <PINInput onChange={this.handlePINChange}/>
                    <Instructions>Enter a 4 digit PIN for <b>{Cookie.getCookie("pin_email")}</b></Instructions>
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