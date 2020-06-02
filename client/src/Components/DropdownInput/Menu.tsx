import React from "react";
import IMenuProps from "./IMenuProps";
import MenuItem from "./MenuItem";
import "./Menu.css";

export default class Menu extends React.Component<IMenuProps> {
    render() {
        return (
            <div className={`menu ${this.getMenuVisibleClass()}`}>
                {
                    this.props.restaurants.map((restaurant, i) => {
                        return <MenuItem 
                                    restaurant={restaurant}
                                    onClick={this.props.handleMenuClick} 
                                    key={i}>
                                        {restaurant.name}
                                </MenuItem>
                    })
                }
            </div>
        )
    }

    private getMenuVisibleClass() {
        return this.props.visible ? "show-menu" : "hide-menu"
    }
}