import React from "react";
import { Link } from "react-router-dom";
import INavPanelProfileIconProps from "./INavPanelProfileIconProps";
import Icon from "../../../../../../Components/Icon";
import INavPanelProfileIconState from "./INavPanelProfileIconState";

export default class NavPanelProfileIcon extends React.Component<INavPanelProfileIconProps, INavPanelProfileIconState> {
    constructor(props: INavPanelProfileIconProps) {
        super(props);
        this.state = {
            hovered: false
        }
        this.toggleHover = this.toggleHover.bind(this);
    }

    render() {
        return (
            <Link 
                to={this.props.to} 
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
                className={this.getContainerClass()}>
                <Icon hovered={this.state.hovered} hoverColor="white" icon={this.props.icon} color="#b1b1b3" />
            </Link>
        )
    }

    private toggleHover() {
        this.setState({
            hovered: !this.state.hovered
        })
    }

    private getContainerClass() {
        return `dashboard-profile-icon-container ${this.props.collapsed ?
            "dashboard-profile-icon-container-collapsed" : ""}`;
    }
}