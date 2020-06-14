import React from "react";
import "./index.css"

export default class AuthenticationLayoutText extends React.Component {
    render() {
        return (
            <h1 className="authentication-layout-title">{this.props.children}</h1>
        )
    }
}