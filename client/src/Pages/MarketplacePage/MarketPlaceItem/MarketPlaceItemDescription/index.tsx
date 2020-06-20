import React from "react";
import IMarketPlaceItemDescriptionProps from "./IMarketPlaceItemDescriptionProps";
import "./index.css";

export default class MarketPlaceItemDescription extends React.Component<IMarketPlaceItemDescriptionProps> {
    render() {
        return (
            <p className="market-place-item-desc">{this.props.desc}</p>
        )
    }
}