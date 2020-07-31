import React from "react";
import { Elements, ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import BasicSectionTitle from "../../../Layouts/BasicLayout/BasicSectionTitle";
import Button from "../../../Components/Button";
import IBillingSectionProps from "./IBillingSectionProps";
import GetOrganizationRequest from "../../../API/GetOrganizationRequest";
import IBillingSectionState from "./IBillingSectionState";
import IResponse from "../../../API/IResponse";
import IOrganization from "../../../API/GetOrganizationRequest/IOrganization";

const stripePromise = loadStripe("pk_test_PAnPqQ77wzeOF3IIqpY5mPKw00yU93n1cB");

export default class BillingSection extends React.Component<IBillingSectionProps, IBillingSectionState> {
    constructor(props : IBillingSectionProps) {
        super(props);
        this.state = {
            organization: null
        }
        this.onOrganizationRequest = this.onOrganizationRequest.bind(this);
    }

    render() {
        return (
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                        {({elements, stripe}) => (
                            <>
                                <GetOrganizationRequest 
                                    send 
                                    organizationId={this.props.organizationId}
                                    onComplete={this.onOrganizationRequest} />
                                <BasicSectionTitle>Update Payment Method</BasicSectionTitle>
                                <CardElement id="card-element" /> 
                                <Button onClick={() => {}}>Cancel Subscription</Button>
                            </>
                        )}
                </ElementsConsumer>
            </Elements>
        )
    }

    onOrganizationRequest(response : IResponse<IOrganization>) {
        this.setState({ organization: response.data })
    }
}