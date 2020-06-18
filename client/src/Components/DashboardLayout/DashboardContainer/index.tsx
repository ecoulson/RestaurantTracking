import React from "react";
import "./index.css";
import DashboardTitle from "../DashboardTitle";

export default class DashboardContainer extends React.Component {
    render() {
        return (
            <div className="dashboard-container">
                <DashboardTitle></DashboardTitle>
                {this.props.children}
            </div>
        )
    }
}