import React from "react";
import ICartItemsProps from "./ICartItemsProps";
import CartItem from "./CartItem";

export default class CartItems extends React.Component<ICartItemsProps> {
    render() {
        return (
            <div className="cart-items">
                {this.props.items.map((item) => {
                    return <CartItem item={item} removeItem={this.props.removeItem} />
                })}
            </div>
        )
    }
}