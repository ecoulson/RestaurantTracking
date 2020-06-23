import React from "react";
import "./index.css";

export default class LoginSettingsContainer extends React.Component {
    render() {
        return (
            <div className="login-settings-container">
                {this.props.children}
            </div>
        )
    }
}