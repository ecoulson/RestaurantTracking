import React from "react";
import "./index.css";
import IBillingCycleProps from "./IBillingCycleOptionProps";
import Button from "../../../../../../../Components/Button";

export default class BillingCycleOption extends React.Component<IBillingCycleProps> {
    render() {
        return (
            <div className={this.getClass()}>
                <div className="billing-cycle-option-container">
                    <h2 className="billing-cycle-option-name">Tier {this.props.option.metadata.Tier}</h2>
                    <div className="billing-cycle-option-price-container">
                        <span className="billing-cycle-option-price">${this.props.option.tiers[0].flat_amount / 100}</span>
                        <span className="billing-cycle-option-unit"> / {this.props.option.interval}</span>
                    </div>
                    <p className="billing-cycle-option-description">{this.props.option.nickname}</p>
                    {!this.props.active ? <Button dark onClick={this.props.onClick}>Select</Button> : null}
                </div>
            </div>
        )
    }

    getClass() {
        return this.props.active ?
            "billing-cycle-option billing-cycle-option-active":
            "billing-cycle-option";  
    }
}