import React from "react";
import { Elements, ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import { loadStripe, StripeElements } from "@stripe/stripe-js";
import BasicSectionTitle from "../../../Layouts/BasicLayout/BasicSectionTitle";
import Button from "../../../Components/Button";
import IBillingSectionProps from "./IBillingSectionProps";
import GetOrganizationRequest from "../../../API/GetOrganizationRequest";
import IBillingSectionState from "./IBillingSectionState";
import IResponse from "../../../API/IResponse";
import IOrganization from "../../../API/GetOrganizationRequest/IOrganization";
import { Stripe } from "@stripe/stripe-js";
import UpdatePaymentMethodRequest from "../../../API/UpdatePaymentMethodRequest";

const stripePromise = loadStripe("pk_test_PAnPqQ77wzeOF3IIqpY5mPKw00yU93n1cB");

export default class BillingSection extends React.Component<IBillingSectionProps, IBillingSectionState> {
    constructor(props : IBillingSectionProps) {
        super(props);
        this.state = {
            organization: null,
            paymentMethodId: "",
            shouldUpdatePaymentMethod: false
        }
        this.onOrganizationRequest = this.onOrganizationRequest.bind(this);
        this.onUpdatePaymentMethod = this.onUpdatePaymentMethod.bind(this);
        this.handleUpdatedPaymentMethod = this.handleUpdatedPaymentMethod.bind(this);
        this.onError = this.onError.bind(this);
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
                                <UpdatePaymentMethodRequest
                                    send={this.state.shouldUpdatePaymentMethod}
                                    customerId={this.state.organization?.stripeId as string} 
                                    paymentMethodId={this.state.paymentMethodId}
                                    onComplete={this.handleUpdatedPaymentMethod}
                                    onError={this.onError}
                                    />
                                <BasicSectionTitle>Update Payment Method</BasicSectionTitle>
                                <CardElement id="card-element" /> 
                                <Button onClick={() => { this.onUpdatePaymentMethod(stripe, elements) }}>Update Payment Method</Button>
                            </>
                        )}
                </ElementsConsumer>
            </Elements>
        )
    }

    onOrganizationRequest(response : IResponse<IOrganization>) {
        this.setState({ organization: response.data })
    }

    async onUpdatePaymentMethod(stripe : Stripe | null, elements: StripeElements | null) {
        if (stripe && elements) {
            const paymentMethod = await this.createPaymentMethod(stripe, elements);
            if (paymentMethod) {
                this.setState({
                    paymentMethodId: paymentMethod.id,
                    shouldUpdatePaymentMethod: true
                })
            }
        }       
    }

    async createPaymentMethod(stripe : Stripe, elements: StripeElements) {
        const card = elements.getElement(CardElement);
        if (!card) {
            // this.props.showError("Something went wrong!", 5000)
        } else {
            const result = await stripe.createPaymentMethod({
                type: 'card',
                card: card
            })
            return result.paymentMethod;   
        }
    }

    handleUpdatedPaymentMethod() {
        this.setState({
            shouldUpdatePaymentMethod: false
        })
    }

    onError() {
        this.setState({
            shouldUpdatePaymentMethod: false
        })
    }
}