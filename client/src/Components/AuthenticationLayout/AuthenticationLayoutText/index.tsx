import React from "react";
import "./index.css"

export default class VerifyAccountText extends React.Component {
    render() {
        return (
            <p className="authentication-layout-text">{this.props.children}</p>
        )
    }
}