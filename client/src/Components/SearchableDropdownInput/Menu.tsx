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

        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <div className={`menu ${this.getMenuVisibleClass()}`}>
                {
                    this.props.values.map((value, i) => {
                        return (
                            <MenuItem 
                                index={i}
                                onClick={this.onClick} 
                                key={i}>
                                    {value}
                            </MenuItem>
                        )
                    })
                }
            </div>
        )
    }

    componentDidUpdate() {
        if (this.state.hasDisplayed || this.props.visible) {
            if (!this.state.hasDisplayed) {
                this.setState({
                    hasDisplayed: true
                })
            }
        }
    }

    private onClick(i : number) {
        this.props.handleMenuClick(i);
    }

    private getMenuVisibleClass() {
        if (!this.state.hasDisplayed && !this.props.visible) {
            return "none";
        } else {
            return this.props.visible ? "show-menu" : "hide-menu"
        }
    }
}