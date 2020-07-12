import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import ISimpleButtonProps from "./ISimpleButtonProps";

export default class SimpleButton extends React.Component<ISimpleButtonProps> {
    render() {
        return <Link to={this.props.to ? this.props.to : ""} className="simple-button">{this.props.children}</Link>
    }
}