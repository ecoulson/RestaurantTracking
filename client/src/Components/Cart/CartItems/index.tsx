import React from "react";

export default class CartItems extends React.Component {
    render() {
        return (
            <div className="cart-items">
                {this.props.children}
            </div>
        )
    }
}