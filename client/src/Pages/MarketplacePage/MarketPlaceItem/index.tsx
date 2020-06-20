import React from "react";
import Widget from "../../../Components/Widget";
import IMarketPlaceItemProps from "./IMarketPlaceItemProps";
import MarketPlaceItemIcon from "./MarketPlaceItemIcon";
import MarketPlaceItemName from "./MarketPlaceItemName";
import MarketPlaceItemDescription from "./MarketPlaceItemDescription";
import Submit from "../../../Components/Submit";
import AppHistory from "../../../AppHistory";
import MarketPlaceItemInfo from "./MarketPlaceItemInfo";

export default class MarketPlaceItem extends React.Component<IMarketPlaceItemProps> {
    render() {
        return (
            <Widget columns={1} rows={1}>
                <MarketPlaceItemIcon icon={this.props.icon} />
                <MarketPlaceItemName name={this.props.name} />
                <MarketPlaceItemDescription desc={this.props.desc} />
                <MarketPlaceItemInfo to={this.props.to} />
            </Widget>
        )
    }
}