import React from "react";
import AppHistory from "../../../../AppHistory";
import IMarketPlaceItemInfoProps from "./IMarketPlaceItemInfoProps";
import Submit from "../../../../Components/Submit";
import "./index.css"

export default class MarketPlaceItemInfo extends React.Component<IMarketPlaceItemInfoProps> {
    constructor(props : IMarketPlaceItemInfoProps) {
        super(props);
        this.redirect = this.redirect.bind(this);
    }

    render() {
        return (
            <div className="market-place-item-info-container">
                <Submit visible={true} onClick={this.redirect}>Learn More</Submit>
            </div>
        )
    }

    private redirect() {
        AppHistory.push(this.props.to)
    }
}