import React from "react";
import "./index.css";
import DashboardNavPanel from "../DashboardLayout/DashboardNavPanel";
import DashboardTitle from "../DashboardLayout/DashboardTitle";

export default class UserProfileLayout extends React.Component {
    render() {
        return (
            <div style={{display: "flex"}}>
                <DashboardNavPanel />
                <div className="user-profile-page"> 
                    <DashboardTitle>Edit Profile</DashboardTitle>
                    <div className="user-profile-wrapper">
                        <div className="user-profile-container">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}