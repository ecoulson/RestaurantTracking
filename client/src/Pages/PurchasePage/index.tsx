import React from "react"
import BasicLayout from "../../Layouts/BasicLayout"
import OrganizationRegistrationPage from "./OrganizationRegistration"
import IPurchasePageProps from "./IPurchasePageProps"
import ContactLogsPurchase from "./PurchaseContactLogsPage"
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_PAnPqQ77wzeOF3IIqpY5mPKw00yU93n1cB");

export default class PurchasePage extends React.Component<IPurchasePageProps> {
    render() {
        switch(this.props.match.params.product) {
            case "organization-setup":
                return (
                    <OrganizationRegistrationPage showSuccess={this.props.showSuccess} />
                )
            case "contact-logs":
                return (
                    <Elements stripe={stripePromise}>
                        <ElementsConsumer>
                                {({elements, stripe}) => (
                                    <ContactLogsPurchase 
                                        elements={elements}
                                        stripe={stripe}
                                        showSuccess={this.props.showSuccess} />
                                )}
                        </ElementsConsumer>
                    </Elements>
                )
            default:
                return (
                    <BasicLayout title="Not Found">
                    </BasicLayout>
                )
        }
    }
}