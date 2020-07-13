import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import ISimpleButtonProps from "./ISimpleButtonProps";

export default class SimpleButton extends React.Component<ISimpleButtonProps> {
    render() {
        return (
            <div className={`simple-button-container ${this.getCenterClass()}`}>
                {this.getLink()}
            </div>
        );
    }

    getLink() {
        return this.props.email ?
            <a href={`mailto:${this.props.email}`} className="simple-button">{this.props.children}</a> :
            <Link to={this.props.to ? this.props.to : ""} className="simple-button">{this.props.children}</Link>
    }

    getCenterClass() {
        return this.props.center ?
            "simple-button-container-center" :
            ""
    }
}