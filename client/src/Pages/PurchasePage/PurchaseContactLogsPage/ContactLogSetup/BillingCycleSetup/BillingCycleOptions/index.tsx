import React from "react";
import IBillingCycleOptionsProps from "./IBillingCycleOptionsProps";
import BillingCycleOption from "./BillingCycleOption";
import "./index.css";
import IBillingCycleOptionsState from "./IBillingCycleOptionsState";
import { CartActions, PaymentType } from "../../../../../../Store/Cart/types";

export default class BillingCycleOptions extends React.Component<IBillingCycleOptionsProps, IBillingCycleOptionsState> {
    constructor(props: IBillingCycleOptionsProps) {
        super(props);
        const subscription = props.cart.filter((item) => {
            return item.name === "Contact Logs Software"
        })[0]
        this.state = {
            activeIndex: -1,
            item: !subscription ?
                null :
                { 
                    cartItem: subscription,
                    type: CartActions.ADD
                }
        }
    } 
    
    render() {
        return (
            <div className="billing-cycle-options">
                {
                    this.props.plans.map((option, i) => {
                        return <BillingCycleOption 
                                    onClick={() => this.handleBillingOptionSelect(i)}
                                    option={option} 
                                    key={i}
                                    active={this.state.activeIndex === i} />
                    })
                }
            </div>
        )
    }

    handleBillingOptionSelect(i : number) {
        if (this.state.item) {
            this.props.removeFromCart(this.state.item.cartItem.id)
        }
        this.props.onBillingPlan(this.props.plans[i])
        this.setState({
            activeIndex: i,
            item: this.props.addToCart({
                name: `Contact Logs Software (Tier ${this.props.plans[i].metadata.Tier})`,
                price: 0,
                quantity: 0,
                description: `Billed $${this.props.plans[i].tiers[0].flat_amount / 100} per ${this.props.plans[i].interval}`,
                productImage: "/light-logo.png",
                id: "",
                type: PaymentType.Subscription,
                billingPlan: this.props.plans[i].interval,
                priceId: this.props.plans[i].id
            })
        })
    }
}