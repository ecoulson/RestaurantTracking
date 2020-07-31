import React, { MouseEvent } from "react";
import BasicLayout from "../../../Layouts/BasicLayout";
import IState from "../../../Store/IState";
import { ConnectedProps, connect } from "react-redux";
import Form from "../../../Components/Form";
import Button from "../../../Components/Button";
import IPurchaseContactLogsPageState from "./IPurchaseContactLogsPageState";
import IPurchaseContactLogsPageProps from "./IPurchaseContactLogsPageProps";
import "./index.css";
import Cart from "../../../Components/Cart";
import ContactLogSetup from "./ContactLogSetup";
import { CardElement } from "@stripe/react-stripe-js";
import { shopModeAction, checkoutModeAction } from "../../../Store/Cart/actions";
import { addToast, removeToast } from "../../../Store/Toast/actions";
import ToastType from "../../../Components/Toast/ToastType";
import Axios from "axios";
import Cookie from "../../../lib/Cookie";
import IFormValue from "../../../Components/FormInput/IFormValue";
import FormValue from "../../../Components/FormInput/FormValue";
import { Stripe, StripeElement, StripeElements, } from "@stripe/stripe-js";

class PurchaseContactLogsPage extends React.Component<Props, IPurchaseContactLogsPageState> {
    constructor(props : Props) {
        super(props);
        this.state = {
            page: 0,
            paymentIntentSecret : "",
            billingEmail: new FormValue<string>("", false)
        }
        this.handleNextClick = this.handleNextClick.bind(this)
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePaymentIntent = this.handlePaymentIntent.bind(this);
        this.handleBillingEmail = this.handleBillingEmail.bind(this);
        this.setCartMode = this.setCartMode.bind(this);
        props.setShopMode()
    }

    render() {
        return (
            <BasicLayout title="Contact Log Setup">
                {this.state.page > 0 ? <Button id="back" onClick={this.handleBackClick}>Back</Button> : null }
                <Form onSubmit={this.handleSubmit} id="contact-log-setup">
                    <div className="contact-log-checkout">
                        <ContactLogSetup 
                            cart={this.props.cart}
                            onBillingEmail={this.handleBillingEmail}
                            onPaymentIntent={this.handlePaymentIntent}
                            page={this.state.page} />
                        <Cart />
                    </div>
                    {this.getButtons()}
                </Form>
            </BasicLayout>
        )
    }

    handleNextClick(e : MouseEvent) {
        (e.target as HTMLButtonElement).blur()
        this.setState({
            page: this.state.page + 1
        }, this.setCartMode)
    }

    handleBackClick(e : MouseEvent) {
        (e.target as HTMLButtonElement).blur()
        this.setState({
            page: this.state.page - 1
        }, this.setCartMode)
    }

    setCartMode() {
        this.state.page === 2 ?
            this.props.setCheckoutMode() :
            this.props.setShopMode()
    }

    getButtons() {
        switch (this.state.page) {
            case 0:
                return <Button id="next" onClick={this.handleNextClick}>Next</Button>
            case 1:
                return <Button id="next" onClick={this.handleNextClick}>Checkout</Button>
            case 2:
                return <Button id="next" onClick={this.handleSubmit}>Complete</Button>
        }
    }

    handlePaymentIntent(paymentIntentSecret : string) {
        this.setState({ paymentIntentSecret })
    }

    handleBillingEmail(billingEmail: IFormValue<string>) {
        this.setState({ billingEmail })
    }
    
    async handleSubmit() {
        const res = await Axios.post(`/api/payment/create-customer`, {
            billingEmail: this.state.billingEmail.value
        }, {
            headers: {
                "Authorization": `bearer ${Cookie.getCookie("token")}`
            }
        });
        const user = res.data.data.user;
        if (this.props.stripe && this.props.elements) {
            const paymentMethod = await this.createPaymentMethod(this.props.stripe, this.props.elements);
            await this.createSubscription(user.stripeId, paymentMethod.id, "price_1HAoY9DHaKfj17c3o9S4G82Q")
        }

        // if (this.props.stripe && this.props.elements) {
        //     const card = this.props.elements.getElement(CardElement);
        //     if (card) {
        //         const payload = await this.props.stripe.confirmCardPayment(this.state.paymentIntentSecret, {
        //             payment_method: {
        //                 card,
        //                 billing_details: {
        //                     name: "Test"
        //                 }
        //             }
        //         });
        //         if (payload.error) {
        //             this.props.addToast("Transaction failed", ToastType.Error)
        //         } else {
        //             this.props.addToast("Successfully processed transaction", ToastType.Success)
        //         }
        //     }
        // }
    }

    async createPaymentMethod(stripe : Stripe, elements : StripeElements) {
        const card = elements.getElement(CardElement);
        if (!card) {
            throw new Error("Failed to create payment method");
        }
        const result = await stripe.createPaymentMethod({
            type: 'card',
            card: card
        })
        if (!result.paymentMethod) {
            throw new Error("Failed to create payment method");
        }
        return result.paymentMethod;
    }

    async createSubscription(customerId : string, paymentMethodId : string, priceId: string) {
        const response = await Axios.post(`/api/payment/create-subscription`, {
            customerId,
            paymentMethodId,
            priceIds: [priceId]
        },
        {
            headers: {
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });
        const result = response.data.data.subscription;
        if (result.error) {
            throw result;
        }
        await this.onSubscriptionComplete(result.subscription);
    }

    async onSubscriptionComplete(subscription : any) {
        if (subscription.status === "active") {
            console.log("Show active subscription");
            console.log("Provision access (register app)")
        }
    }
}

const mapState = (state : IState) => {
    return {
        organizations: state.user.organizations,
        cart: state.cart.items
    }
}

const mapDispatch = {
    setShopMode: shopModeAction,
    setCheckoutMode: checkoutModeAction,
    addToast: addToast,
    removeToast: removeToast
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & IPurchaseContactLogsPageProps;

export default connector(PurchaseContactLogsPage)