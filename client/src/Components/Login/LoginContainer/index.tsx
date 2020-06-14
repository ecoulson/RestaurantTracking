import React from "react";
import "./index.css";

export default class LoginContainer extends React.Component {
    render() {
        return (
            <div className="login-container">
                {this.props.children}
            </div>
        )
    }
}