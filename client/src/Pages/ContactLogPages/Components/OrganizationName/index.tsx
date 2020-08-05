import React from "react";
import "./index.css";

export default class OrganizationName extends React.Component {
    render() {
        return <h1 className="organization-name">{this.props.children}</h1>
    }
}