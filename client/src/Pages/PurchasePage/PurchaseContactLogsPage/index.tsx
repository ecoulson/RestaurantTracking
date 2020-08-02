import React from "react";
import BasicLayout from "../../../Layouts/BasicLayout";
import IState from "../../../Store/IState";
import { ConnectedProps, connect } from "react-redux";
import Form from "../../../Components/Form";
import IPurchaseContactLogsPageState from "./IPurchaseContactLogsPageState";
import IPurchaseContactLogsPageProps from "./IPurchaseContactLogsPageProps";
import "./index.css";
import Cart from "../../../Components/Cart";
import ContactLogSetup from "./ContactLogSetup";
import { CardElement } from "@stripe/react-stripe-js";
import { shopModeAction, checkoutModeAction, clearCartAction } from "../../../Store/Cart/actions";
import Axios from "axios";
import Cookie from "../../../lib/Cookie";
import IFormValue from "../../../Components/FormInput/IFormValue";
import FormValue from "../../../Components/FormInput/FormValue";
import { Stripe, StripeElements, } from "@stripe/stripe-js";
import RegisterOrganizationRequest from "../../../API/RegisterOrganizationRequest";
import IResponse from "../../../API/IResponse";
import IAddress from "../../../Components/AddressInput/IAddress";
import BackButton from "./BackButton";
import NextButton from "./NextButton";
import IRegisterOrganizationResponse from "../../../API/RegisterOrganizationRequest/IRegisterOrganizationResponse";
import AppHistory from "../../../AppHistory";
import RegisterAppRequest from "../../../API/RegisterAppRequest";
import IPrice from "../../../API/GetBillingPlanRequest/IPrice";
import { ProductType } from "../../../Store/Cart/types";

class PurchaseContactLogsPage extends React.Component<Props, IPurchaseContactLogsPageState> {
    constructor(props : Props) {
        super(props);
        this.state = {
            page: 0,
            paymentIntentSecret : "",
            billingEmail: new FormValue<string>("", false),
            address: null,
            organizationName: "",
            organizationId: "",
            shouldCreateOrganization: false,
            shouldCreateApp: false,
            stripeProductId: "",
            stripeSubscriptionId: "",
            billingPlan: null
        }
        this.canProgress = this.canProgress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePaymentIntent = this.handlePaymentIntent.bind(this);
        this.handleBillingEmail = this.handleBillingEmail.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.onOrganizationResponse = this.onOrganizationResponse.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleOrganizationId = this.handleOrganizationId.bind(this);
        this.handleOrganizationName = this.handleOrganizationName.bind(this);
        this.onOrganizationRegistrationFailed = this.onOrganizationRegistrationFailed.bind(this);
        this.onAppError = this.onAppError.bind(this);
        this.handleBillingPlan = this.handleBillingPlan.bind(this);
        this.showError = this.showError.bind(this);
        props.setShopMode()
    }

    componentWillMount() {
        this.props.clearCart()
    }

    render() {
        return (
            <BasicLayout title="Contact Log Setup">
                <BackButton 
                    page={this.state.page}
                    onClick={this.handlePageChange}
                    setCheckoutMode={this.props.setCheckoutMode}
                    setShopMode={this.props.setShopMode}
                    />
                <RegisterOrganizationRequest 
                    address={this.state.address}
                    organizationName={this.state.organizationName}
                    organizationId={this.state.organizationId}
                    onError={this.onOrganizationRegistrationFailed}
                    onComplete={this.onOrganizationResponse}
                    send={this.state.shouldCreateOrganization} />
                <RegisterAppRequest 
                    send={this.state.shouldCreateApp}
                    organizationId={this.state.organizationId}
                    stripeProductId={this.state.stripeProductId}
                    stripeSubscriptionId={this.state.stripeSubscriptionId}
                    onComplete={this.onAppCreate}
                    onError={this.onAppError}
                    />
                <Form onSubmit={this.handleSubmit} id="contact-log-setup">
                    <div className="contact-log-checkout">
                        <ContactLogSetup 
                            cart={this.props.cart}
                            onBillingPlan={this.handleBillingPlan}
                            onBillingEmail={this.handleBillingEmail}
                            onPaymentIntent={this.handlePaymentIntent}
                            onAddress={this.handleAddress}
                            onOrganizationName={this.handleOrganizationName}
                            onOrganizationId={this.handleOrganizationId}
                            page={this.state.page} />
                        <Cart />
                    </div>
                    <NextButton 
                        canProgress={this.canProgress}
                        page={this.state.page}
                        showError={this.showError}
                        onClick={this.handlePageChange}
                        setCheckoutMode={this.props.setCheckoutMode}
                        setShopMode={this.props.setShopMode}
                        onSubmit={this.handleSubmit} />
                </Form>
            </BasicLayout>
        )
    }

    canProgress() {
        switch (this.state.page) {
            case 0:
                return this.state.billingPlan !== null;
            case 1:
                return this.state.billingPlan !== null && 
                        this.props.cart.length > 1;
            default:
                return false;
        }
    }

    showError() {
        if (this.state.billingPlan === null) {
            this.props.showError("Please select an app plan", 5000)
        } else if (this.props.cart.length === 1) {
            this.props.showError("Please add a location", 5000)
        } else if (!this.state.address) {
            this.props.showError("Please enter a valid address", 5000)
        } else if (!this.state.billingEmail.valid) {
            this.props.showError("Please enter a valid billing email", 5000)
        }
    }

    handleBillingPlan(billingPlan: IPrice | null) {
        this.setState({ billingPlan })
    }

    handleAddress(address : IAddress) {
        this.setState({ address })
    }

    handleOrganizationName(organizationName: string) {
        this.setState({ organizationName });
    }

    handleOrganizationId(organizationId: string) {
        this.setState({ organizationId })
    }

    handlePageChange(page : number) {
        this.setState({ page })
    }

    handlePaymentIntent(paymentIntentSecret : string) {
        this.setState({ paymentIntentSecret })
    }

    handleBillingEmail(billingEmail: IFormValue<string>) {
        this.setState({ billingEmail })
    }
    
    handleSubmit() {
        if (this.state.address !== null && 
            this.state.billingEmail.valid && 
            this.state.billingPlan !== null && 
            this.props.cart.length > 1) {
            this.setState({
                shouldCreateOrganization: true
            })
        } else {
            this.showError()
        }
    }

    onOrganizationRegistrationFailed() {
        this.setState({
            shouldCreateOrganization: false
        })
    }

    async onOrganizationResponse(response: IResponse<IRegisterOrganizationResponse>) {
        const organization = await this.createCustomer(response.data.organization.organizationId)
        if (this.props.stripe && this.props.elements) {
            const paymentMethod = await this.createPaymentMethod(this.props.stripe, this.props.elements);
            if (!paymentMethod) {
                this.props.showError("Failed to create payment method", 5000)
            } else {
                await this.addSetupFee(organization.stripeId)
                await this.createSubscription(
                    organization.stripeId, 
                    paymentMethod.id, 
                    this.state.billingPlan?.id as string
                )
            }
        }
    }

    async createCustomer(organizationId: string) {
        try {
            return (await Axios.post(`/api/payment/create-customer`, {
                billingEmail: this.state.billingEmail.value,
                organizationId: organizationId
            }, {
                headers: {
                    "Authorization": `bearer ${Cookie.getCookie("token")}`
                }
            })).data.data.organization;
        } catch (error) {
            this.props.showError("Failed to create customer", 5000)
        }
    }

    async createPaymentMethod(stripe : Stripe, elements : StripeElements) {
        const card = elements.getElement(CardElement);
        if (!card) {
            this.props.showError("Something went wrong!", 5000)
        } else {
            const result = await stripe.createPaymentMethod({
                type: 'card',
                card: card
            })
            return result.paymentMethod;   
        }
    }

    async addSetupFee(customerId: string) {
        const physicalProducts = this.props.cart.filter((cartItem) => {
            return cartItem.productType === ProductType.Physical
        });
        const response = await Axios.post("/api/payment/create-invoice", {
            cartItems: physicalProducts,
            customerId
        }, {
            headers: {
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });
        console.log(response.data);
    }

    async createSubscription(customerId : string, paymentMethodId : string, priceId: string) {
        try {
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
            const subscription = response.data.data.subscription;
            await this.onSubscriptionComplete(subscription);
            await this.handlePaymentWithAuthentication(subscription, paymentMethodId);
        } catch (error) {
            this.props.showError("Failed to create subscription", 5000)
        }
    }

    async handlePaymentWithAuthentication(subscription: any, paymentMethodId: string) {
        let setupIntent = subscription.pending_setup_intent;
        if (setupIntent) { 
            if (setupIntent.status === 'requires_action') {
                const result = await this.props.stripe?.confirmCardSetup(setupIntent.client_secret, {
                    payment_method: paymentMethodId
                })
                if (result?.error) {
                    this.props.showError("Card declined", 5000);
                }
            } else {
                const response = await Axios.get(`/api/payment/get-setup-intent/${setupIntent}`, {
                    headers: {
                        "Authorization": `Bearer ${Cookie.getCookie("token")}`
                    }
                });
                const setupIntentObject = response.data.data.setupIntent;
                const result = await this.props.stripe?.confirmCardSetup(setupIntentObject.client_secret, {
                    payment_method: paymentMethodId
                })
                if (result?.error) {
                    this.props.showError("Card declined", 5000);
                }
            }
        }
    }

    async onSubscriptionComplete(subscription : any) {
        if (subscription.status === "active") {
            this.setState({
                stripeProductId: subscription.items.data[0].price.product,
                stripeSubscriptionId: subscription.id,
                shouldCreateApp: true
            })
        }
    }

    onAppCreate() {
        AppHistory.push(`/organizations`)
    }

    onAppError() {
        this.setState({
            shouldCreateApp: false
        })
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
    clearCart: clearCartAction
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & IPurchaseContactLogsPageProps;

export default connector(PurchaseContactLogsPage)