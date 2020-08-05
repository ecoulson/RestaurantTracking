import React from "react";
import "./index.css";

export default class BillingCycleDescription extends React.Component {
    render() {
        return (
            <p className="billing-cycle-description">{this.props.children}</p>
        )
    }
}