import React from "react";
import "./index.css";
import Logo from "../../Logo";

export default class DashboardNavPannel extends React.Component {
    render() {
        return (
            <div className="dashboard-nav-pannel">
                <Logo dark horizontal />
            </div>
        )
    }
}