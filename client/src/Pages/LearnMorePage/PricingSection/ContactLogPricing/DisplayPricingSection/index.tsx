import React from "react";
import IDisplayPricingSectionProps from "./IDisplayPricingSectionProps";
import "./index.css"
import NumberInput from "../../../../../Components/NumberInput";
import IconType from "../../../../../Components/Icon/IconTypes";

export default class DisplayPricingSection extends React.Component<IDisplayPricingSectionProps> {
    constructor(props : IDisplayPricingSectionProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <div className="display-pricing-section">
                <img 
                    className="display-pricing-section-image"
                    alt={this.props.alt} 
                    src={this.props.image} />
                <NumberInput 
                    id={this.props.id}
                    onChange={this.onChange} 
                    label={this.props.label}
                    placeHolder={this.props.placeHolder}
                    icon={IconType.Image} />
            </div>
        )
    }

    onChange(value: number) {
        this.props.onChange(this.getValue(value))
    }

    getValue(n : number) {
        return isNaN(n) ? 0 : n;
    }
}