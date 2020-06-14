import React from "react";
import "./index.css";

export default class LoginBackground extends React.Component {
    render() {
        return (
            <div className="login-background">
                {this.props.children}
            </div>
        )
    }
}