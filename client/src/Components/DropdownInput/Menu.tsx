import React from "react";
import IMenuProps from "./IMenuProps";
import MenuItem from "./MenuItem";
import "./Menu.css";
import IMenuState from "./IMenuState";

export default class Menu extends React.Component<IMenuProps, IMenuState> {
    constructor(props: IMenuProps) {
        super(props);
        this.state = {
            hasDisplayed: false
        }
    }

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
        if (!this.state.hasDisplayed && !this.props.visible) {
            return "none";
        } else {
            if (!this.state.hasDisplayed) {
                this.setState({
                    hasDisplayed: true
                })
            }
            return this.props.visible ? "show-menu" : "hide-menu"
        }
    }
}