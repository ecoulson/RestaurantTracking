import React from "react";
import Icon from "../../../../../Components/Icon";
import IconType from "../../../../../Components/Icon/IconTypes";
import "./index.css";

export default class DashboardProfileAvatar extends React.Component {
    render() {
        return (
            <div className="dashboard-profile-avatar">
                <Icon icon={IconType.User} color="#969090" />
            </div>
        )
    }
}