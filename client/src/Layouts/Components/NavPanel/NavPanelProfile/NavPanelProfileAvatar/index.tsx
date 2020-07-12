import React from "react";
import Icon from "../../../../../Components/Icon";
import IconType from "../../../../../Components/Icon/IconTypes";
import "./index.css";
import INavPanelProfileAvatarProps from "./INavPanelProfileAvatarProps";

export default class NavPanelProfileAvatar extends React.Component<INavPanelProfileAvatarProps> {
    render() {
        return (
            <div className={`dashboard-profile-avatar ${this.getCollapsedClass()}`}>
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

    private getCollapsedClass() {
        return this.props.collapsed ?
            "dashboard-profile-avatar-collapsed" :
            ""
    }
}