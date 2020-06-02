import React from "react";
import "./Label.css";

export default class Label extends React.Component {
    render() {
        return (
            <label className="form-label">{this.props.children}</label>
        )
    }
}