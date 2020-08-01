import React from "react";
import IBillingCycleOptionsProps from "./IBillingCycleOptionsProps";
import BillingCycleOption from "./BillingCycleOption";
import "./index.css";
import IBillingCycleOptionsState from "./IBillingCycleOptionsState";
import { CartActions, ProductType, AppType } from "../../../../../../Store/Cart/types";

export default class BillingCycleOptions extends React.Component<IBillingCycleOptionsProps, IBillingCycleOptionsState> {
    constructor(props: IBillingCycleOptionsProps) {
        super(props);
        const subscription = props.cart.filter((item) => {
            return item.appType === AppType.ContactLogs &&
                    item.productType === ProductType.App
        })[0]
        const activeIndex = props.plans.reduce<number>((index, plan, i) => {
            if (!subscription) {
                return index;
            }
            return plan.id === subscription.prices[0].priceId ? i : index
        }, -1)
        this.state = {
            activeIndex: activeIndex,
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
                name: `Contact Logs App (Tier ${this.props.plans[i].metadata.Tier})`,
                price: 0,
                quantity: 0,
                description: `Billed $${this.props.plans[i].tiers[0].flat_amount / 100} per ${this.props.plans[i].interval}`,
                productImage: "/light-logo.png",
                productType: ProductType.App,
                appType: AppType.ContactLogs,
                billingPlan: this.props.plans[i].interval,
                prices: [{
                    priceId: this.props.plans[i].id,
                    quantity: 1
                }],
                onDelete: () => {
                    this.setState({ activeIndex: -1 })
                    this.props.onBillingPlan(null)
                }
            })
        })
    }
}