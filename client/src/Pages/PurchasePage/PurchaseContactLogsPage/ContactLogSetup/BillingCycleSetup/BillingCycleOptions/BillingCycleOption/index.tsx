import React from "react";
import "./index.css";
import IBillingCycleProps from "./IBillingCycleOptionProps";
import Button from "../../../../../../../Components/Button";

export default class BillingCycleOption extends React.Component<IBillingCycleProps> {
    render() {
        return (
            <div className={this.getClass()}>
                <div className="billing-cycle-option-container">
                    <h2 className="billing-cycle-option-name">{this.props.option.name}</h2>
                    <div className="billing-cycle-option-price-container">
                        <span className="billing-cycle-option-price">${this.props.option.cost}</span>
                        <span className="billing-cycle-option-unit"> / {this.props.option.unit}</span>
                    </div>
                    <p className="billing-cycle-option-description">Billed every {this.props.option.unit}</p>
                    <Button dark onClick={this.props.onClick}>{this.getButtonText()}</Button>
                </div>
            </div>
        )
    }

    getClass() {
        return this.props.active ?
            "billing-cycle-option billing-cycle-option-active":
            "billing-cycle-option";  
    }

    getButtonText() {
        return this.props.active ?
            "Selected":
            "Select"
    }
}