import React from "react";
import "./index.css";

export default class BillingCycleWrapper extends React.Component {
    render() {
        return (
            <div className="billing-cycle-setup">
                {this.props.children}
            </div>
        )
    }
}