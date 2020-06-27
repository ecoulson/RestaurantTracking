import React from "react";
import Icon from "../../../../../Components/Icon";
import IconType from "../../../../../Components/Icon/IconTypes";
import "./index.css";
import IDashboardProfileAvatarProps from "./IDashboardProfileAvatarProps";

export default class DashboardProfileAvatar extends React.Component<IDashboardProfileAvatarProps> {
    render() {
        return (
            <div className="dashboard-profile-avatar">
                {this.getAvatar()}
            </div>
        )
    }

    private getAvatar() {
        if (this.props.profilePicture) {
            return <img alt="profile avatar" className="dashboard-profile-avatar-image" src={this.props.profilePicture} />
        } else {
            return <Icon icon={IconType.User} color="#969090" />;
        }
    }
}