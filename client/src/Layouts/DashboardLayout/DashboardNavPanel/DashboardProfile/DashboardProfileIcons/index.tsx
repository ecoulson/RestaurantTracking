import React from "react";
import Icon from "../../../../../Components/Icon";
import IconType from "../../../../../Components/Icon/IconTypes";
import "./index.css";
import { Link } from "react-router-dom";

export default class DashboardProfileIcons extends React.Component {
    render() {
        return (
            <div className="dashboard-profile-icons">
                <Link to="/settings" className="dashboard-profile-icon-container">
                    <Icon icon={IconType.Settings} color="#CFD0D3" />
                </Link>
                <Link to="/help" className="dashboard-profile-icon-container">
                    <Icon icon={IconType.Help} color="#CFD0D3" />
                </Link>
                <Link to="/logout" className="dashboard-profile-icon-container">
                    <Icon icon={IconType.Logout} color="#CFD0D3" />
                </Link>
            </div>
        )
    }
}