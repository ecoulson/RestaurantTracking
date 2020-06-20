import React from "react";
import "./index.css";

export default class DashboardTitle extends React.Component {
    render() {
        return (
        <h1 className="dashboard-title">{this.props.children}</h1>
        )
    }
}