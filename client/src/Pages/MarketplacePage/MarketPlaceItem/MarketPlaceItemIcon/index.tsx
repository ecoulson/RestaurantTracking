import React from "react";
import Icon from "../../../../Components/Icon";
import IMarketPlaceItemIconProps from "./IMarketPlaceItemIconProps";
import "./index.css";

export default class MarketPlaceItemIcon extends React.Component<IMarketPlaceItemIconProps> {
    render() {
        return (
            <div className="market-place-item-icon">
                <Icon icon={this.props.icon} color="black" />
            </div>
        )
    }
}