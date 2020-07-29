import React from "react";
import "./index.css";

export default class Cart extends React.Component {
    render() {
        return (
            <div className="cart">
                <h1 className="cart-header">Items in your Cart</h1>
                <div className="cart-items">

                </div>
                <div className="cart-price-container">
                    <span className="total">
                        Total: $69.69
                    </span>
                </div>
            </div>
        )
    }
}