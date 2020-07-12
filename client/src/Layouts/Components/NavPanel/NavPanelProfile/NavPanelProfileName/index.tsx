import React from "react";
import INavPanelProfileNameProps from "./INavPanelProfileNameProps";
import "./index.css";

export default class NavPanelProfileName extends React.Component<INavPanelProfileNameProps> {
    render() {
        return (
            <p className={`dashboard-profile-name ${this.getCollapsedClass()}`}>
                {this.props.firstName} {this.props.lastName}
            </p>
        )
    }

    private getCollapsedClass() {
        return this.props.collapsed ?
            "dashboard-profile-name-collapsed" :
            "";
    }
}