import React from "react";
import "./Label.css";
import ILabelProps from "./ILabelProps";

export default class Label extends React.Component<ILabelProps> {
    render() {
        return (
            <label htmlFor={this.props.id} className={`form-label ${this.getThemeClass()}`}>{this.props.children}</label>
        )
    }

    getThemeClass() {
        return this.props.dark ?
            "form-label-dark" :
            "form-label-light";
    }
}