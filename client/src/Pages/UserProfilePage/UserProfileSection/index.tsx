import React from "react";
import "./index.css"

export default class UserProfileSection extends React.Component {
    render() {
        return (
            <div className="user-profile-section">
                {this.props.children}
            </div>
        )
    }
}