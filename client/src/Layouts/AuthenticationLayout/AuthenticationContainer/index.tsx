import React from "react";
import "./index.css";

export default class AuthenticationContainer extends React.Component {
    render() {
        return (
            <div className="authentication-container">
                {this.props.children}
            </div>
        )
    }
}