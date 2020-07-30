import React from "react";
import AddressInput from "../../../../../Components/AddressInput";
import "./index.css";
import OrganizationIdInput from "../../../../../Components/OrganizationIdInput";
import IOrganizationSetupState from "./IOrganizationSetupState";
import IFormValue from "../../../../../Components/FormInput/IFormValue";
import OrganizationNameInput from "./OrganizationNameInput";
import IAddress from "../../../../../Components/AddressInput/IAddress";
import CreditCardInput from "../../../../../Components/CreditCardInput";
import ICreditCard from "../../../../../lib/ICreditCard";
import FormValue from "../../../../../Components/FormInput/FormValue";

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
            },
            creditCard: {
                number: new FormValue<string>("", false),
                zip: new FormValue<string>("", false),
                cvc: new FormValue<string>("", false),
                expirationDate: [new FormValue<string>("", false), new FormValue<string>("", false)]
            }
        }
        this.handleOrganizationIdChange = this.handleOrganizationIdChange.bind(this);
        this.handleOrganizationNameChange = this.handleOrganizationNameChange.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    }

    render() {
        return (
            <div className="organization-setup">
                <h1>Final Steps</h1>
                <h2>Establishment Information</h2>
                <OrganizationNameInput onChange={this.handleOrganizationNameChange}  />
                <OrganizationIdInput value={this.state.organizationId} id="organization-id" onChange={this.handleOrganizationIdChange} />
                <AddressInput iconColor="gray" hoverColor="black" onChange={this.handleAddress} />
                <h2>Payment Information</h2>
                <CreditCardInput onChange={this.handleCreditCardChange} />
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

    handleCreditCardChange(creditCard: ICreditCard) {
        this.setState({ creditCard });
    }
}