import React from "react";
import "./index.css";

export default class CartPrice extends React.Component {
    render() {
        return (
            <div className="cart-price-container">
                <span className="total">Total: $69.69</span>
            </div>
        )
    }
}