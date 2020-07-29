import React from "react";
import ICartItemsProps from "./ICartItemsProps";
import CartItem from "./CartItem";
import "./index.css";

export default class CartItems extends React.Component<ICartItemsProps> {
    render() {
        return (
            <div className="cart-items">
                {this.props.items.length === 0 ?
                    <p className="empty-cart-text">There is nothing in your cart yet!</p>: 
                    this.props.items.map((item) => {
                        return <CartItem item={item} removeItem={this.props.removeItem} />
                    })
                }
            </div>
        )
    }
}