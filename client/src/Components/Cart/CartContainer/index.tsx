import React from "react";
import "./index.css"

export default class CartContainer extends React.Component {
    render() {
        return (
            <div className="cart">
                <div className="cart-container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}