import React from "react";
import Form from "../../../Components/Form";
import BasicSectionTitle from "../../../Layouts/BasicLayout/BasicSectionTitle";
import "./index.css";
import TextInput from "../../../Components/TextInput";
import IconType from "../../../Components/Icon/IconTypes";
import Button from "../../../Components/Button";
import AddressInput from "../../../Components/AddressInput";
import IAddress from "../../../Components/AddressInput/IAddress";
import IOrganizationRegistrationState from "./IOrganizationRegistrationState";
import FormInput from "../../../Components/FormInput";
import IFormValue from "../../../Components/FormInput/IFormValue";
import Instructions from "../../ContactLogPages/Instructions";
import OrganizationIdInput from "../../../Components/OrganizationIdInput";
import RegisterOrganizationRequest from "../../../API/RegisterOrganizationRequest";
import AppHistory from "../../../AppHistory";

export default class OrganizationRegistrationPage extends React.Component<{}, IOrganizationRegistrationState> {
    constructor(props : {}) {
        super(props);
        this.state = {
            address: {
                addressLine1: "",
                addressLine2: "",
                city: "",
                zip: "",
                country: "",
                state: ""
            },
            organizationName: "",
            organizationId: "",
            send: false
        }
        this.onOrganizationName = this.onOrganizationName.bind(this);
        this.onOrganizationId = this.onOrganizationId.bind(this);
        this.onAddress = this.onAddress.bind(this);
        this.onError = this.onError.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <div className="organization-registration-page">
                <RegisterOrganizationRequest
                    organizationId={this.state.organizationId}
                    address={this.state.address}
                    onError={this.onError}
                    onComplete={this.onComplete}
                    organizationName={this.state.organizationName}
                    send={this.state.send} />
                <BasicSectionTitle>Organization Information</BasicSectionTitle>
                <Form onSubmit={this.onSubmit}>
                    <TextInput
                        id="organization"
                        isValid={true}
                        autocomplete="organization"
                        name="organization"
                        icon={IconType.Users}
                        iconColor="#AAAAAA"
                        hoverColor="#232C47"
                        placeholder="Organization name..."
                        label="Organization Name"
                        onChange={this.onOrganizationName} />
                    <OrganizationIdInput
                        value={this.state.organizationId}
                        onChange={this.onOrganizationId}
                        id="organization-id" />
                    <AddressInput
                        iconColor="#AAAAAA"
                        hoverColor="#232C47"
                        onChange={this.onAddress} />
                    <Button submit>Create</Button>
                </Form>
            </div>
        )
    }

    onSubmit() {
        this.setState({
            send: true
        })
    }

    onOrganizationName(organizationName : string) {
        this.setState({ 
            organizationName,
            organizationId: organizationName.toLowerCase().split(" ").map((word) => word.substring(0, 1)).join("")
        })
    }

    onOrganizationId(organizationId : IFormValue<string>) {
        this.setState({ organizationId: organizationId.value })
    }

    onAddress(address: IAddress) {
        this.setState({ address })
    }

    onError() {
        this.setState({
            send: false
        })
    }

    onComplete() {
        setTimeout(() => {
            AppHistory.push(`/${this.state.organizationId}`);
        }, 4000)
    }
}