import React from "react";
import "./index.css";
import DashboardTitle from "../DashboardTitle";
import IDashboardContainerProps from "./IDashboardContainerProps";

export default class DashboardContainer extends React.Component<IDashboardContainerProps> {
    render() {
        return (
            <div className="dashboard-container">
                <DashboardTitle>{this.props.title}</DashboardTitle>
                <div className="dashboard-grid">
                    {this.props.children}
                </div>
            </div>
        )
    }
}