import React from "react";
import "./index.css";
import Logo from "../../../Components/Logo";
import DashboardLinks from "./DashboardLinks";
import DashboardProfile from "./DashboardProfile";

export default class DashboardNavPanel extends React.Component {
    render() {
        return (
            <div className="dashboard-nav-panel">
                <Logo dark horizontal />
                <DashboardLinks />
                <DashboardProfile />
            </div>
        )
    }
}