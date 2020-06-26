import React from "react";
import "./index.css";

export default class BasicSectionTitle extends React.Component {
    render() {
        return (
            <h1 className="basic-section-title">{this.props.children}</h1>
        )
    }
}