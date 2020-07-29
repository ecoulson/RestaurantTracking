import React from "react";
import "./index.css";
import ICartPrice from "./ICartPrice";

export default class CartPrice extends React.Component<ICartPrice> {
    render() {
        return (
            <div className="cart-price-container">
                <span className="total">Total: ${this.getTotalPrice()}</span>
            </div>
        )
    }

    getTotalPrice() {
        return this.props.items.reduce<number>((totalPrice : number, item) => {
            return totalPrice + item.price;
        }, 0).toFixed(2);
    }
}