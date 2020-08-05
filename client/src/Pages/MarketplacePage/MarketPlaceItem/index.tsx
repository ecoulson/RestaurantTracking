import React from "react";
import Widget from "../../../Components/Widget";
import IMarketPlaceItemProps from "./IMarketPlaceItemProps";
import MarketPlaceItemIcon from "./MarketPlaceItemIcon";
import MarketPlaceItemName from "./MarketPlaceItemName";
import MarketPlaceItemInfo from "./MarketPlaceItemInfo";

export default class MarketPlaceItem extends React.Component<IMarketPlaceItemProps> {
    render() {
        return (
            <Widget columns={4} rows={2}>
                <MarketPlaceItemIcon icon={this.props.icon} />
                <MarketPlaceItemName name={this.props.name} />
                <MarketPlaceItemInfo learnMore={this.props.learnMore} purchase={this.props.purchase} />
            </Widget>
        )
    }
}