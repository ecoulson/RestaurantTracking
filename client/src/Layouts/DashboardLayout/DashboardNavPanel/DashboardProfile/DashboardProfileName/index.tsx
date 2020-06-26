import React from "react";
import IDashboardProfileName from "./IDashboardProfileName";
import "./index.css";

export default class DashboardProfileName extends React.Component<IDashboardProfileName> {
    render() {
        return (
            <p className="dashboard-profile-name">{this.props.firstName} {this.props.lastName}</p>
        )
    }
}