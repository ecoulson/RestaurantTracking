import React, { MouseEvent } from "react";
import IMenuItemProps from "./IMenuItemProps"

export default class MenuItem extends React.Component<IMenuItemProps> {
    render() {
        return (
            <p onClick={this.handleClick()} className="menu-item">{this.props.children}</p>
        )
    }

    handleClick() {
        return (event : MouseEvent) => {
            this.props.onClick(this.props.restaurant);
        }
    }
}