import React from "react";
import Widget from "../../../Components/Widget";
import IMarketPlaceItemProps from "./IMarketPlaceItemProps";
import MarketPlaceItemIcon from "./MarketPlaceItemIcon";
import MarketPlaceItemName from "./MarketPlaceItemName";
import MarketPlaceItemDescription from "./MarketPlaceItemDescription";
import MarketPlaceItemInfo from "./MarketPlaceItemInfo";

export default class MarketPlaceItem extends React.Component<IMarketPlaceItemProps> {
    render() {
        return (
            <Widget columns={4} rows={3}>
                <MarketPlaceItemIcon icon={this.props.icon} />
                <MarketPlaceItemName name={this.props.name} />
                <MarketPlaceItemDescription desc={this.props.desc} />
                <MarketPlaceItemInfo to={this.props.to} />
            </Widget>
        )
    }
}