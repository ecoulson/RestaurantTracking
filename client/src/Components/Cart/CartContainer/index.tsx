import React from "react";
import "./index.css"

export default class CartContainer extends React.Component {
    render() {
        return (
            <div className="cart">
                {this.props.children}
            </div>
        )
    }
}