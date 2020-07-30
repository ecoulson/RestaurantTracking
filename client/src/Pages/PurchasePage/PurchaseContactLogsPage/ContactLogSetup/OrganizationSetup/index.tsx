import React from "react";
import AddressInput from "../../../../../Components/AddressInput";
import "./index.css";
import OrganizationIdInput from "../../../../../Components/OrganizationIdInput";
import IOrganizationSetupState from "./IOrganizationSetupState";
import IFormValue from "../../../../../Components/FormInput/IFormValue";
import OrganizationNameInput from "./OrganizationNameInput";
import IAddress from "../../../../../Components/AddressInput/IAddress";
import CreditCardInput from "../../../../../Components/CreditCardInput";

export default class OrganizationSetup extends React.Component<{}, IOrganizationSetupState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            organizationId: "",
            organizationName: "",
            address: {
                addressLine1: "",
                addressLine2: "",
                city: "",
                country: "",
                state: "",
                zip: ""
            }
        }
        this.handleOrganizationIdChange = this.handleOrganizationIdChange.bind(this);
        this.handleOrganizationNameChange = this.handleOrganizationNameChange.bind(this)
    }

    render() {
        return (
            <div className="organization-setup">
                <h1>Final Steps</h1>
                <OrganizationNameInput onChange={this.handleOrganizationNameChange}  />
                <OrganizationIdInput value={this.state.organizationId} id="organization-id" onChange={this.handleOrganizationIdChange} />
                <AddressInput iconColor="gray" hoverColor="black" onChange={() => {}} />
                <CreditCardInput />
            </div>
        )
    }

    handleOrganizationIdChange(organizationId: IFormValue<string>) {
        this.setState({ organizationId: organizationId.value });
    }

    handleOrganizationNameChange(organizationName: string) {
        this.setState({ 
            organizationName,
            organizationId: this.generatePossibleOrganizationId(organizationName)
        })
    }

    generatePossibleOrganizationId(organizationName: string) {
        if (organizationName.split(" ").length < 3) {
            return organizationName.substring(0, 3).toLowerCase();
        } else {
            return organizationName.split(" ")
                .filter((word) => {
                    return word.toLowerCase() !== "the" && word.toLowerCase() !== "of"
                })
                .reduce((id, word) => {
                    return id + word.substring(0, 1).toLowerCase()
                }, "")
        }
    }

    handleAddress(address : IAddress) {
        this.setState({ address })
    }
}