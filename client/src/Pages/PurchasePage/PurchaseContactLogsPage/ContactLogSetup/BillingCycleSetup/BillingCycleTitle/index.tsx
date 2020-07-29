import React from "react";
import "./index.css";

export default class BillingCycleTitle extends React.Component {
    render() {
        return (
            <h1 className="billing-cycle-title">{this.props.children}</h1>
        )
    }
}