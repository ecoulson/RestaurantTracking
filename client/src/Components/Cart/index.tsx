import React from "react";
import "./index.css";
import CartContainer from "./CartContainer";
import CartTitle from "./CartTitle";
import CartPrice from "./CartPrice";
import CartItems from "./CartItems";
import IState from "../../Store/IState";
import { removeFromCartAction } from "../../Store/Cart/actions";
import { connect, ConnectedProps } from "react-redux";

class Cart extends React.Component<Props> {
    render() {
        return (
            <CartContainer>
                <CartTitle />
                <CartItems
                    isCheckingOut={this.props.cart.isCheckingOut} 
                    items={this.props.cart.items} 
                    removeItem={this.props.removeItem} />
                <CartPrice items={this.props.cart.items} />
            </CartContainer>
        )
    }
}

const mapState = (state : IState) => {
    return {
        cart: state.cart
    }
}

const mapDispatch = {
    removeItem: removeFromCartAction
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux;

export default connector(Cart)