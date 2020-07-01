import React from "react";
import Icon from "../../../../../Components/Icon";
import IconType from "../../../../../Components/Icon/IconTypes";
import "./index.css";
import { Link } from "react-router-dom";
import INavPanelProfileIconsProps from "./INavPanelProfileIconsProps";
import NavPanelProfileIcon from "./NavPanelProfileIcon";

export default class NavPanelProfileIcons extends React.Component<INavPanelProfileIconsProps> {
    render() {
        return (
            <div className={`dashboard-profile-icons ${this.getCollapsedClass()}`}>
                <NavPanelProfileIcon 
                    to="/settings" 
                    icon={IconType.Settings} 
                    collapsed={this.props.collapsed} />
                <NavPanelProfileIcon 
                    to="/help" 
                    icon={IconType.Help} 
                    collapsed={this.props.collapsed} />
                <NavPanelProfileIcon 
                    to="/logout" 
                    icon={IconType.Logout} 
                    collapsed={this.props.collapsed} />
            </div>
        )
    }

    private getCollapsedClass() {
        return this.props.collapsed ?
            "dashboard-profile-icons-collapsed" : 
            "";
    }
}