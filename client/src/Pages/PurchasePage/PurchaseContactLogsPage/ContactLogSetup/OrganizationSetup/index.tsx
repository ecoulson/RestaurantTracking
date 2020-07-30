import React from "react";
import AddressInput from "../../../../../Components/AddressInput";
import "./index.css";
import OrganizationIdInput from "../../../../../Components/OrganizationIdInput";
import IOrganizationSetupState from "./IOrganizationSetupState";
import IFormValue from "../../../../../Components/FormInput/IFormValue";
import OrganizationNameInput from "./OrganizationNameInput";
import IAddress from "../../../../../Components/AddressInput/IAddress";
import Axios from "axios";
import Cookie from "../../../../../lib/Cookie";
import IOrganizationSetupProps from "./IOrganizationSetupProps";
import { CardElement } from "@stripe/react-stripe-js";

export default class OrganizationSetup extends React.Component<IOrganizationSetupProps, IOrganizationSetupState> {
    constructor(props: IOrganizationSetupProps) {
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
        this.handleOrganizationNameChange = this.handleOrganizationNameChange.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
    }

    async componentWillMount() {
        const res = await Axios.post('/api/payment/purchase', {
            cart: this.props.cart
        }, {
            headers: {
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });
        console.log(this.props.cart)
        this.props.onPaymentIntent(res.data.data.paymentIntent.client_secret)
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
                <CardElement id="card-element" />
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