import React from "react";
import AppHistory from "../../../../AppHistory";
import IMarketPlaceItemInfoProps from "./IMarketPlaceItemInfoProps";
import Button from "../../../../Components/Button";
import "./index.css"
import { Link } from "react-router-dom";

export default class MarketPlaceItemInfo extends React.Component<IMarketPlaceItemInfoProps> {
    constructor(props : IMarketPlaceItemInfoProps) {
        super(props);
        this.redirect = this.redirect.bind(this);
    }

    render() {
        return (
            <div className="market-place-item-info-container">
                <Link className="learn-more-link" to={this.props.learnMore}>Learn More</Link>
                <Button onClick={this.redirect}>Purchase</Button>
            </div>
        )
    }

    private redirect() {
        AppHistory.push(this.props.purchase)
    }
}