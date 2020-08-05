import React from "react";
import BillingCycleWrapper from "./BillingCycleWrapper";
import BillingCycleTitle from "./BillingCycleTitle";
import BillingCycleOptions from "./BillingCycleOptions";
import IBillingCycleSetupProps from "./IBillingCycleSetupProps";
import BillingCycleDescription from "./BillingCycleDescription";
import { connect, ConnectedProps } from "react-redux";
import { addToCartAction, removeFromCartAction } from "../../../../../Store/Cart/actions";
import IState from "../../../../../Store/IState";

class BillingCycleSetup extends React.Component<Props> {
    render() {
        return (
            <BillingCycleWrapper>
                <BillingCycleTitle>Select an App Payment Plan</BillingCycleTitle>
                <BillingCycleDescription>{this.props.description}</BillingCycleDescription>
                <BillingCycleOptions 
                    cart={this.props.cart}
                    onBillingPlan={this.props.onBillingPlan}
                    addToCart={this.props.addItemToCart}
                    removeFromCart={this.props.removeFromCart}
                    plans={this.props.plans} />
            </BillingCycleWrapper>
        )
    }
}

const mapState = (state : IState) => {
    return {
        cart: state.cart.items
    }
}

const mapDispatch = {
    addItemToCart: addToCartAction,
    removeFromCart: removeFromCartAction
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & IBillingCycleSetupProps;

export default connector(BillingCycleSetup)