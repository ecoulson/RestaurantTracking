import React from "react";
import INavPanelProfileEmailProps from "./INavPanelProfileEmailProps";
import "./index.css";

export default class NavPanelProfileEmail extends React.Component<INavPanelProfileEmailProps> {
    render() {
        return (
            <p className={`dashboard-profile-email ${this.getCollapsedClass()}`}>
                {this.props.email}
            </p>
        )
    }

    private getCollapsedClass() {
        return this.props.collapsed ? 
            "dashboard-profile-email-collapsed" :
            ""
    }
}