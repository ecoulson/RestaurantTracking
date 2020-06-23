import React from "react";
import IDashboardProfileEmailProps from "./IDashboardProfileEmailProps";
import "./index.css";

export default class DashboardProfileEmail extends React.Component<IDashboardProfileEmailProps> {
    render() {
        return (
            <p className="dashboard-profile-email">{this.props.email}</p>
        )
    }
}