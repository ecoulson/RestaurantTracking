import React from "react";
import "./index.css";

export default class AuthenticationBackground extends React.Component {
    render() {
        return (
            <div className="authentication-background">
                {this.props.children}
            </div>
        )
    }
}