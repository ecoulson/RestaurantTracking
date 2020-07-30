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

class PurchaseContactLogsPage extends React.Component<Props, IPurchaseContactLogsPageState> {
    constructor(props : Props) {
        super(props);
        this.state = {
            page: 0,
            paymentIntentSecret : ""
        }
        this.handleNextClick = this.handleNextClick.bind(this)
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePaymentIntent = this.handlePaymentIntent.bind(this);
    }

    render() {
        return (
            <BasicLayout title="Contact Log Setup">
                {this.state.page > 0 ? <Button id="back" onClick={this.handleBackClick}>Back</Button> : null }
                <Form onSubmit={this.handleSubmit} id="contact-log-setup">
                    <div className="contact-log-checkout">
                        <ContactLogSetup 
                            cart={this.props.cart}
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
        })
    }

    handleBackClick(e : MouseEvent) {
        (e.target as HTMLButtonElement).blur()
        this.setState({
            page: this.state.page - 1
        })
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
    
    async handleSubmit() {
        if (this.props.stripe && this.props.elements) {
            const card = this.props.elements.getElement(CardElement);
            if (card) {
                const payload = await this.props.stripe.confirmCardPayment(this.state.paymentIntentSecret, {
                    payment_method: {
                        card,
                        billing_details: {
                            name: "Test"
                        }
                    }
                });
                if (payload.error) {
                    console.error("error")
                } else {
                    console.log("check dashboard")
                }
            }
        }
        
    }
}

const mapState = (state : IState) => {
    return {
        organizations: state.user.organizations,
        cart: state.cart.items
    }
}

const mapDispatch = {}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & IPurchaseContactLogsPageProps;

export default connector(PurchaseContactLogsPage)