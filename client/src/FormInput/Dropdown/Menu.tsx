import React from "react";
import IMenuProps from "./IMenuProps";
import MenuItem from "./MenuItem";
import "./Menu.css";

export default class Menu extends React.Component<IMenuProps> {
    render() {
        return (
            <div className="menu">
                {
                    this.props.restaurants.map((restaurant) => {
                        return <MenuItem>{restaurant.name}</MenuItem>
                    })
                }
            </div>
        )
    }
}