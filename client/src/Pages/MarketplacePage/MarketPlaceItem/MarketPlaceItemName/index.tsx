import React from "react";
import IMarketPlaceItemNameProps from "./IMarketPlaceItemNameProps";
import "./index.css"

export default class MarketPlaceItemName extends React.Component<IMarketPlaceItemNameProps> {
    render() {
        return <h1 className="market-place-item-name">{this.props.name}</h1>
    }
}