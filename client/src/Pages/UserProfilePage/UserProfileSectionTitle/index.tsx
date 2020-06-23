import React from "react";
import "./index.css";

export default class UserProfileSectionTitle extends React.Component {
    render() {
        return (
            <h1 className="user-profile-section-title">{this.props.children}</h1>
        )
    }
}